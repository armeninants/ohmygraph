<template>
  <div class="container-fluid my-rdf-graph-container" ref="graphContainer">
  </div>
</template>

<script>
import * as d3 from 'd3';
export default {
  props: {
    model: {
      type: Object,
      required: true,
    },
    endpoint: {
      type: String,
      default: '',
    },
  },

  computed: {

  },

  data() {
    return {
      graph: {
        "nodes": [
          {
            "id": "Myriel",
            "type": 1
          },
          {
            "id": "Napoleon",
            "type": 1
          },
          {
            "id": "Mlle.Baptistine",
            "type": 1
          },
          {
            "id": "Mme.Magloire",
            "type": 1
          },
        ],
        "links": [
          {
            "source": "Myriel",
            "target": "Napoleon",
            "type": 1
          },
          {
            "source": "Mlle.Baptistine",
            "target": "Mme.Magloire",
            "type": 8
          },
          {
            "source": "Myriel",
            "target": "Mlle.Baptistine",
            "type": 10
          },
          {
            "source": "Mme.Magloire",
            "target": "Myriel",
            "type": 6
          },
        ],
      },
    };
  },

  created() {

  },

  mounted() {
    var bodySelection = d3.select(this.$refs.graphContainer);
    var svg = bodySelection.append("svg")
      .attr("width", '100%')
      .attr("height", 500);

    var $svg = $(svg.node());

    var width = $svg.width();
    var height = $svg.height();

    svg = svg.call(d3.zoom().on("zoom", zoomed)).append("g");

    svg.append("defs").append("marker")
        .attr("id", "arrow")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 20)
        .attr("refY", 0)
        .attr("markerWidth", 8)
        .attr("markerHeight", 8)
        .attr("orient", "auto")
      .append("svg:path")
        .attr("d", "M0,-5L10,0L0,5");

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d) { return d.id; }))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));

    //d3.json("data.json", createGraph );

    function createGraph (error, graph) {
      if (error) throw error;

      var link = svg.append("g")
          .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
          .attr("stroke", function(d) { return color(d.type); })
          .attr("marker-end", "url(#arrow)");


      var node = svg.append("g")
          .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
          .attr("r", 10)
          .attr("fill", function(d) { if (d.root == "true") return color(d.root); return color(d.type); })
          .call(d3.drag()
              .on("start", dragstarted)
              .on("drag", dragged)
              .on("end", dragended));

    var text = svg.append("g").attr("class", "labels").selectAll("g")
        .data(graph.nodes)
      .enter().append("g");

    text.append("text")
        .attr("x", 14)
        .attr("y", ".31em")
        .style("font-family", "sans-serif")
        .style("font-size", "0.7em")
        .text(function(d) { return d.id; });

      node.on("click",function(d){
        console.log("clicked", d.id);
      });


      node.append("title")
          .text(function(d) { return d.id; });

      simulation
          .nodes(graph.nodes)
          .on("tick", ticked);

      simulation.force("link")
          .links(graph.links);


      function ticked() {
        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
            
        text
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })


      }
    }


    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    function zoomed() {
      svg.attr("transform", "translate(" + d3.event.transform.x + "," + d3.event.transform.y + ")" + " scale(" + d3.event.transform.k + ")");
    }

    createGraph(false, this.graph);
  },
}
</script>

<style>
.links line {
  stroke-opacity: 0.6;
  stroke-width: 1px;
  fill: none;
}

.nodes circle {
  stroke: #333;
  stroke-width: 1.5px;
}
</style>
