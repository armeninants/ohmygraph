#!/usr/bin/env node

/** Produces a JSON file used for handling prefixes in RDF URIs. */

const fs  = require('fs')
const path = require('path')
const request = require('request')
const chalk = require('chalk')

const PREFIXCC_URL = 'https://prefix.cc/popular/all.file.json'
const HUE_MIN = 0
const HUE_MAX = 359

const exitWithError = msg => {
  console.log(chalk.red(msg))
  process.exit(1)
}

const shuffle = array => {
  var currentIndex = array.length, temporaryValue, randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

const getProcessedPrefixes = source => {
  const entries = Object.entries(source).sort((a,b) => {return a[1].length - b[1].length})
  const num = entries.length
  const hues = shuffle([...Array(num).keys()]).map( x => Math.round(x*1.0*(HUE_MAX-HUE_MIN)/(num-1) + HUE_MIN) )
  const entriesWithColors = entries.map( (x,i) => [x[1], x[0], hues[i]] )
  return entriesWithColors
}

const savePrefixes = (data, callback) => {
  const fileNameFull = path.join(__dirname, '../client/src/scripts/prefixes.json')
  const content = JSON.stringify(data)

  fs.writeFile(fileNameFull, content, err => {
    if (err) exitWithError("Couldn't write file")
    else callback()
  })
}

//====================================================================

// 1. Download a JSON object from URL
request({
  url: PREFIXCC_URL,
  json: true
}, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    // 2. Process it
    const prefixes = getProcessedPrefixes(response.body)
    // 3. Save it
    savePrefixes(prefixes, () => console.log(chalk.green('Done.')))
  } else {
    console.log(chalk.red(`Failed to load from ${PREFIXCC_URL}`))
    process.exit(1)
  }
})
