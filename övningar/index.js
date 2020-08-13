const container = d3.select(".container")
container.append("svg")

const svg = d3.select("svg")
svg.attr("width", 600)
svg.attr("height", 600)


let circleData = [
    {radius: 3, circleX: 500, circleY: 143, color: "red"},
    {radius: 6, circleX: 250, circleY: 130, color: "green"},
    {radius: 9, circleX: 70, circleY: 43, color: "yellow"},
    {radius: 12, circleX: 143, circleY: 100, color: "black"},
    {radius: 34, circleX: 321, circleY: 139, color: "blue"}
]

    const selection = svg.selectAll("circle").data(circleData)
        selection.enter()
            .append("circle")
            .attr("cx", (num, index) => circleData[index].circleX)
            .attr("cy", (num, index) => circleData[index].circleY)
            .attr("r", (num, index) => circleData[index].radius)
            .attr("fill", (num, index) => circleData[index].color)


            let colors = ["red", "green", "blue", "black", "purple", "orange", "grey", "brown", "lightblue", "darkred"]

for (let i = 0; i < 10; i++) {
    svg.append("circle")
    .attr("cx", Math.random() * 500)
    .attr("cy", Math.random() * 500)
    .attr("r", Math.random() * 50)
    .attr("fill", `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`)
}
