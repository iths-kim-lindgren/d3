(async function () {
    var margin = { top: 20, left: 50, right: 50, bottom: 50 },
        height = 4000 - margin.top - margin.bottom,
        width = 2000 - margin.left - margin.right;

    var svg = d3.select("#map")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
        var svg = d3.select("#map")
        .append("svg")
        .attr("height", height)
        .attr("width", width)
        .append("g")
        .attr("transform", "translate(" + 0 + "," + 0 + ")");

    // PROJECTION
    var projection = d3.geoMercator()
        .translate([width / 2.5, height / 1.5])
        .scale(1000)
        // .center()

    // geocentroid

    console.log(d3)

    // CREATE PATH
    var path = d3.geoPath()
        .projection(projection)

        var time = 0
        var countUp = setInterval(function (){
            time++
            document.querySelector("h3").innerText = `Time: ${time} seconds`
        }, 1000)

    // const data = await d3.json("capitals_0yl.json")
    const data = await Promise.all([d3.json("countries.geojson"), d3.json("capitals.geojson")])
        console.log(data)
    var topology = topojson.topology({ foo: data[0], bar: data[1] });

    const countries = topojson.feature(topology, topology.objects.foo).features
    const cities = topojson.feature(topology, topology.objects.bar).features
    // const countries = topojson.feature(data, data.objects.ne_110m_admin_0_countries1).features
    
    let targetCountries = countries
    let targetCities = cities.filter(city => city.properties.FEATURECLA === "Admin-0 capital" && city.properties.TIMEZONE.includes("Europe"))
    console.log(targetCities)
    selectCountry()

    let combined = d3.merge([countries, cities])
    console.log(combined)


    svg.selectAll(".country")
        .data(combined) /* binder selectAll till enter() */
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
                if (d.targetCity && !d.previousTarget){
                    let index = targetCountries.indexOf(d)
                    d.previousTarget = true

                    targetCountries.splice(index, 1)
                    selectCountry()
                }
            d3.select(this).classed("selected", true)
        })
        
        function selectCountry() {
            if (targetCities.length == 0) {
                document.querySelector("h2").innerText = `Solved it in ${time} seconds!`
                clearInterval(countUp)
           return
        }
        let rand = Math.floor(Math.random() * targetCities.length)
        console.log(targetCities)
        for (let country in targetCities) {
            targetCities[country].targetCity = false
            if (country == rand) {
                targetCities[country].targetCity = true
                document.querySelector("h2").innerText = `Click on ${targetCities[country].properties.NAME}`
            }
        }
    }
})()