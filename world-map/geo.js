// var topology = topojson.topology({foo: geojson});

// const data = "./world.json"

(async function () {
    var margin = { top: 50, left: 50, right: 50, bottom: 50 },
        height = 400 - margin.top - margin.bottom,
        width = 800 - margin.left - margin.right;

    var svg = d3.select("#map")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // PROJECTION
    var projection = d3.geoMercator()
        .translate([width / 2, height / 2])
        .scale(100)

    // CREATE PATH

    var path = d3.geoPath()
        .projection(projection)


    const data = await d3.json("world.json")


    const countries = topojson.feature(data, data.objects.ne_110m_admin_0_countries1).features
    console.log(countries)

    svg.selectAll(".country")
        .data(countries) /* binder selectAll till enter() */
        .enter().append("path")
        .attr("class", "country")
        .attr("d", path)
        .on("mouseover", function (d) {
            d3.select(this).classed("targeted", true)
        })
        .on("mouseout", function (d) {
            d3.select(this).classed("targeted", false)
        })
        .on("click", function (d) {
            d3.selectAll(".country")
            .classed("selected", false)
            d3.select(this).classed("selected", true)
        })



})()