const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

var display1 = document.getElementById("in1").value;
var display2 =document.getElementById("in2").value;
var display3 =document.getElementById("in3").value;
var display4 =document.getElementById("in4").value;
var display5 =document.getElementById("in5").value;
var display6 =document.getElementById("in6").value;

function myFunction() {
  console.log("test")
  
  display1 = document.getElementById("in1").value;
  myChart.data.labels[0] = display1
  console.log(myChart.data.labels[0]);
  
  display2 = document.getElementById("in2").value;
  myChart.data.labels[1] = display2
  console.log(myChart.data.labels[1]);
  
  display3 = document.getElementById("in3").value;
  myChart.data.labels[2] = display3
  console.log(myChart.data.labels[2]);
  
  display4 = document.getElementById("in4").value;
  myChart.data.labels[3] = display4
  console.log(myChart.data.labels[3]);
  
  display5 = document.getElementById("in5").value;
  myChart.data.labels[4] = display5
  console.log(myChart.data.labels[4]);
  
  display6 = document.getElementById("in6").value;
  myChart.data.labels[5] = display6
  console.log(myChart.data.labels[5]);
  
}
//Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 30, value: 2 },
  { minDegree: 31, maxDegree: 90, value: 1 },
  { minDegree: 91, maxDegree: 150, value: 6 },
  { minDegree: 151, maxDegree: 210, value: 5 },
  { minDegree: 211, maxDegree: 270, value: 4 },
  { minDegree: 271, maxDegree: 330, value: 3 },
  { minDegree: 331, maxDegree: 360, value: 2 },
];
//Size of each piece
const data = [16, 16, 16, 16, 16, 16];
//background color for each piece
var pieColors = [
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
];

//Create chart
let myChart = new Chart(wheel, {
  //Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  //Chart Type Pie
  type: "pie",
  data: {
    //Labels(values which are to be displayed on chart)
    labels: [display1, display2, display3, display4, display5, display6],
    //Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    //Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      //hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      //display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});

//display value based on the randomAngle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    //if the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>Value: ${i.value}</p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};

//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;

document.getElementById('in1').addEventListener('input', function(event) {
  display1 = event.target.value;
  myChart.data.labels[0] = display1
  console.log(myChart.data.labels[0]);
});

document.getElementById('in2').addEventListener('input', function(event) {
  display2 = event.target.value;
  myChart.data.labels[1] = display2
  console.log(myChart.data.labels[1]);
});

document.getElementById('in3').addEventListener('input', function(event) {
  display3 = event.target.value;
  myChart.data.labels[2] = display3
  console.log(myChart.data.labels[2]);
});

document.getElementById('in4').addEventListener('input', function(event) {
  display4 = event.target.value;
  myChart.data.labels[3] = display4
  console.log(myChart.data.labels[3]);
});

document.getElementById('in5').addEventListener('input', function(event) {
  display5 = event.target.value;
  myChart.data.labels[4] = display5
  console.log(myChart.data.labels[4]);
});
  
document.getElementById('in6').addEventListener('input', function(event) {
  display6 = event.target.value;
  myChart.data.labels[5] = display6
  console.log(myChart.data.labels[5]);
});

//Start spinning
spinBtn.addEventListener("click", () => {
  
  
  spinBtn.disabled = true;
  //Empty final value
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  //Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    //Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
    */
    myChart.options.rotation = myChart.options.rotation + resultValue;
    //Update chart with new value;
    myChart.update();
    //If rotation>360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
