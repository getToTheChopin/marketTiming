var dailyDateArray = [];
var dailyClosePriceArray = [];
var dailyDividendArray = [];

//Access google sheet spreadsheet using tabletop
var publicSpreadsheetUrl = "https://docs.google.com/spreadsheets/d/1RGRqoENNsQG4mq9zmttZVphVCzoh9GDgTtin8cg23vk/edit?usp=sharing";


var contributionFlagArray = [];

var selectedDateArray = [];

var selectedP1NetWorthArray = [];
var selectedP2NetWorthArray = [];
var selectedDailyPriceArray = [];
var selectedAllTimeHighArray = [];
var selectedGapToATHArray = [];

var selectedP2CashBalanceArray = [];
var selectedP2StockBalanceArray = [];
var selectedP2CashWeightArray = [];
var selectedP2StockWeightArray = [];

var selectedNetWorthGapArray = [];

var contributionArray = [];

var daysInYear = 365.25;

var portfolioValueChartAxisType = "logarithmic";

var cumulativeContributionArray = [];
var selectedCumulativeContributionArray = [];

var allTimeHighArray = [];
var gapToATHArray = [];

var P1CashBOPArray = [];
var P1CashInterestArray = [];
var P1DividendsReceivedArray = [];
var P1AmountInvestedArray = [];
var P1CashEOPArray = [];
var P1InvestFlagArray = [];
var P1SharesBOPArray = [];
var P1SharesPurchasedArray = [];
var P1SharesEOPArray = [];
var P1StockBalanceArray = [];
var P1NetWorthArray = [];

var P2CashBOPArray = [];
var P2CashInterestArray = [];
var P2DividendsReceivedArray = [];
var P2AmountInvestedArray = [];
var P2CashEOPArray = [];
var P2InvestFlagArray = [];
var P2SharesBOPArray = [];
var P2SharesPurchasedArray = [];
var P2SharesEOPArray = [];
var P2StockBalanceArray = [];
var P2NetWorthArray = [];

var totalDays = dailyDateArray.length;

var monthsBetweenSelectedDateRange = 0;

var cumulativeContributions = 0;

var chart;
var chart2;
var chart3;
var chart4;
var chart5;
var chart6;

var tickSpacing = daysInYear;

var initialContribution = 0;
var monthlyContribution = 0;
var cashInterestRate = 0;
var tradingTransactionFee = 0;
var P2ATHGapThreshold = 0;

var countAtATH = 0;
var countWithin1Pct = 0;
var countWithin3Pct = 0;
var countWithin5Pct = 0;
var countWithin10Pct = 0;
var countWithin20Pct = 0;
var countWithin30Pct = 0;
var countWithin40Pct = 0;
var countWithin50Pct = 0;
var countWithin60Pct = 0;
var countMoreThan60Pct = 0;
var numSelectedDays = 0;

var daysAtATHNumCell = document.getElementById("daysAtATHNumCell");
var daysAtATHPctCell = document.getElementById("daysAtATHPctCell");
var daysWithin1NumCell = document.getElementById("daysWithin1NumCell");
var daysWithin1PctCell = document.getElementById("daysWithin1PctCell");
var daysWithin3NumCell = document.getElementById("daysWithin3NumCell");
var daysWithin3PctCell = document.getElementById("daysWithin3PctCell");
var daysWithin5NumCell = document.getElementById("daysWithin5NumCell");
var daysWithin5PctCell = document.getElementById("daysWithin5PctCell");
var daysWithin10NumCell = document.getElementById("daysWithin10NumCell");
var daysWithin10PctCell = document.getElementById("daysWithin10PctCell");
var daysWithin20NumCell = document.getElementById("daysWithin20NumCell");
var daysWithin20PctCell = document.getElementById("daysWithin20PctCell");
var daysWithin30NumCell = document.getElementById("daysWithin30NumCell");
var daysWithin30PctCell = document.getElementById("daysWithin30PctCell");
var daysWithin40NumCell = document.getElementById("daysWithin40NumCell");
var daysWithin40PctCell = document.getElementById("daysWithin40PctCell");
var daysWithin50NumCell = document.getElementById("daysWithin50NumCell");
var daysWithin50PctCell = document.getElementById("daysWithin50PctCell");
var daysWithin60NumCell = document.getElementById("daysWithin60NumCell");
var daysWithin60PctCell = document.getElementById("daysWithin60PctCell");
var daysMoreThan60NumCell = document.getElementById("daysMoreThan60NumCell");
var daysMoreThan60PctCell = document.getElementById("daysMoreThan60PctCell");
var totalDaysNumCell = document.getElementById("totalDaysNumCell");
var totalDaysPctCell = document.getElementById("totalDaysPctCell");

var initialContributionInput = document.getElementById("initialContributionInput");
var monthlyContributionInput = document.getElementById("monthlyContributionInput");
var cashInterestRateInput = document.getElementById("cashInterestRateInput");
var tradingTransactionFeeInput = document.getElementById("tradingTransactionFeeInput");
var gapToATHInput = document.getElementById("gapToATHInput");

var P1EndValueCell = document.getElementById("P1EndValueCell");
var P1ReturnCell = document.getElementById("P1ReturnCell");
var P2EndValueCell = document.getElementById("P2EndValueCell");
var P2ReturnCell = document.getElementById("P2ReturnCell");
var P3EndValueCell = document.getElementById("P3EndValueCell");
var P3ReturnCell = document.getElementById("P3ReturnCell");

var finalPortfolioDateCell = document.getElementById("finalPortfolioDateCell");
var P2LabelCell = document.getElementById("P2LabelCell");
var averageAnnualReturnCell = document.getElementById("averageAnnualReturnCell");

var loadingImageDiv = document.getElementById("loadingImageDiv");
var mainContainerDiv = document.getElementById("mainContainerDiv");
var outputContainerDiv = document.getElementById("outputContainerDiv");

var refreshButtonDiv = document.getElementById("refreshButtonDiv");

var advancedInputButton = document.getElementById("advancedInputButton");
var advancedOptionsFlag = 0;
var advancedInputDiv = document.getElementById("advancedInputDiv");

var generateURLButton = document.getElementById("generateURLButton");
var customURLOutput = document.getElementById("customURLOutput");

var activeChartFlag = false;

var sliderInputMinYear = 1980;
var sliderInputMaxYear = 2020;

var outputPara1 = document.getElementById("outputPara1");

var mySlider = new rSlider({
    target: '#yearRangeSlider',
    values: {min: 1980, max: 2020},
    step: 1,
    range: true,
    tooltip: true,
    scale: true,
    labels: false,
    set: [sliderInputMinYear, sliderInputMaxYear],
    onChange: function (values) {

    }
});

var minSelectedYear = 0;
var maxSelectedYear = 0;

var startDateOffset = 0;

var selectedStartDate;
var selectedEndDate;

//main method

advancedInputDiv.classList.add("hide");
advancedOptionsFlag = 1;

outputContainerDiv.classList.add("hide");
mainContainerDiv.classList.add("hide");

//add event listeners on inputs
var inputsArray = document.getElementsByClassName("userInput");
for(i=0;i<inputsArray.length;i++) {
    inputsArray[i].addEventListener('change',hideOutputs, false);
    console.log("add input event listener");
}

generateCustomURL();
init();


//Other Functions

function hideOutputs(){
    if(outputContainerDiv.classList.contains("hide")){

    } else{
        outputContainerDiv.classList.add("hide");
    }

    //console.log(initialContribution);
    //console.log(monthlyContribution);
    console.log("Call hideOutputs functions");
    //console.trace();
        
}

function toggleAdvancedOptions(){
    if(advancedOptionsFlag==1){
        advancedInputDiv.classList.remove("hide");
        advancedInputButton.innerHTML = "- Advanced Options";
        advancedOptionsFlag = 0;
    } else if(advancedOptionsFlag==0){
        advancedInputDiv.classList.add("hide");
        advancedInputButton.innerHTML = "+ Advanced Options";
        advancedOptionsFlag = 1;
    }
}

function getURLValues () {
    var hashParams = window.location.hash.substr(1).split('&'); // substr(1) to remove the `#`

    if(hashParams[0] === "") {
        return;
    }

    for(i=0; i <hashParams.length; i++){
        console.log("# of URL values imported: "+hashParams.length);
        var p = hashParams[i].split('=');

        if(p[0] == "minYear"){
            sliderInputMinYear = Number(decodeURIComponent(p[1]));
            console.log("Slider input min year: "+sliderInputMinYear)
        } else if(p[0] == "maxYear"){
            sliderInputMaxYear = Number(decodeURIComponent(p[1]));
            console.log("Slider input max year: "+sliderInputMaxYear)
        } else{
            document.getElementById(p[0]).value = decodeURIComponent(p[1]);
        }
    }

    //adjust slider range based on custom URL input
    mySlider.setValues(sliderInputMinYear, sliderInputMaxYear);
}

function generateCustomURL() {

    generateURLButton.addEventListener('click', function() {

        var customURL = [location.protocol, '//', location.host, location.pathname].join('');
        console.log("Custom URL: "+customURL);

        var inputsArray = document.getElementsByClassName("userInput");

        for(i=0; i<inputsArray.length; i++){
            if(i == 0){
                customURL += "#"+inputsArray[i].id+"="+inputsArray[i].value;
            } else{
                customURL += "&"+inputsArray[i].id+"="+inputsArray[i].value; 
            }
        }

        customURL += "&minYear="+minSelectedYear;
        customURL += "&maxYear="+maxSelectedYear;
       
        customURLOutput.innerHTML = customURL;
        copyToClipboard('customURLOutput');

    }, false);

}

function getUserInputs(){
    initialContribution = Number(initialContributionInput.value);
    monthlyContribution = Number(monthlyContributionInput.value);
    cashInterestRate = Number(cashInterestRateInput.value)/100;
    tradingTransactionFee = Number(tradingTransactionFeeInput.value);
    P2ATHGapThreshold = Number(gapToATHInput.value)/100;

    //set time period from range slider
    var yearRangeSliderValues = mySlider.getValue();
    var yearRangeSliderValuesArray = yearRangeSliderValues.split(',');

    console.log("Current slider values: "+yearRangeSliderValues);

    minSelectedYear = Number(yearRangeSliderValuesArray[0]);
    maxSelectedYear = Number(yearRangeSliderValuesArray[1]);
}

function init() {
    Tabletop.init( {
        key: publicSpreadsheetUrl,
        callback: showInfo,
        simpleSheet: true,
        debug:true
    })
}

//Turn JSON from Tabletop into arrays -- generate full arrays
function showInfo(data, tabletop) {

    //generate full arrays pulled from the master google sheets spreadsheet
    for (i=0;i<data.length;i++) {
        dailyDateArray[i] = String(data[i].Date);
        totalDays = dailyDateArray.length;

        dailyClosePriceArray[i] = Number(data[i].VFINX);
        dailyDividendArray[i] = Number(data[i].VFINXDiv);
    }

    loadingImageDiv.classList.add("hide");
    mainContainerDiv.classList.remove("hide");

    getURLValues();
    getUserInputs();
    calculateResults();
    showOutputs();
    showTextOutputs();
}

function refreshAnalysis(){
    console.log("refresh analysis");

    selectedDateArray.length = 0;

    selectedP1NetWorthArray.length = 0;
    selectedP2NetWorthArray.length = 0;

    selectedDailyPriceArray.length = 0;
    selectedAllTimeHighArray.length = 0;
    selectedGapToATHArray.length = 0;

    selectedP2CashBalanceArray.length = 0;
    selectedP2StockBalanceArray.length = 0;
    selectedP2CashWeightArray.length = 0;
    selectedP2StockWeightArray.length = 0;

    selectedNetWorthGapArray.length = 0;

    contributionFlagArray.length = 0;
    contributionArray.length = 0;

    allTimeHighArray.length = 0;
    gapToATHArray.length = 0;

    P1CashBOPArray.length = 0;
    P1CashInterestArray.length = 0;
    P1DividendsReceivedArray.length = 0;
    P1AmountInvestedArray.length = 0;
    P1CashEOPArray.length = 0;
    P1InvestFlagArray.length = 0;
    P1SharesBOPArray.length = 0;
    P1SharesPurchasedArray.length = 0;
    P1SharesEOPArray.length = 0;
    P1StockBalanceArray.length = 0;
    P1NetWorthArray.length = 0;

    P2CashBOPArray.length = 0;
    P2CashInterestArray.length = 0;
    P2DividendsReceivedArray.length = 0;
    P2AmountInvestedArray.length = 0;
    P2InvestFlagArray.length = 0;
    P2SharesBOPArray.length = 0;
    P2SharesPurchasedArray.length = 0;
    P2SharesEOPArray.length = 0;
    P2StockBalanceArray.length = 0;
    P2NetWorthArray.length = 0;

    totalDays = dailyDateArray.length;

    monthsBetweenSelectedDateRange = 0;

    startDateOffset = 0;

    cumulativeContributionArray.length = 0;
    selectedCumulativeContributionArray.length = 0;

    customURLOutput.innerHTML = "Click button to save / share your custom scenario";

    if(activeChartFlag == true){
        chart.destroy();
        chart2.destroy();
        chart3.destroy();
        chart4.destroy();
        chart5.destroy();
        chart6.destroy();
        activeChartFlag = false;
    }

    countAtATH = 0;
    countWithin1Pct = 0;
    countWithin3Pct = 0;
    countWithin5Pct = 0;
    countWithin10Pct = 0;
    countWithin20Pct = 0;
    countWithin30Pct = 0;
    countWithin40Pct = 0;
    countWithin50Pct = 0;
    countWithin60Pct = 0;
    countMoreThan60Pct = 0;
    numSelectedDays = 0;

    getUserInputs();

    if(monthlyContribution <= 0 && initialContribution <=0){
        alert("To run the analysis, you need to enter a value greater than zero for either the initial contribution amount or the monthly contribution amount.");
        return;
    }

    calculateResults();
    showOutputs();
    showTextOutputs();
}


function calculateResults(){

    for (i=0; i<totalDays; i++){

        //calculate all-time high and gap to ATH
        var currentPrice = Number(dailyClosePriceArray[i]);
        
        if(i==0){
            allTimeHighArray[i] = currentPrice;
        } else{
            if(currentPrice >= allTimeHighArray[i-1]){
                allTimeHighArray[i] = currentPrice;
            } else{
                allTimeHighArray[i] = allTimeHighArray[i-1]; 
            }
        }

        //fill contribution flag array; Y value if it is the last trading day in a month
        var currentDateString = String(dailyDateArray[i]);
        var nextDateString = String(dailyDateArray[i+1]);
        var currentDateMonth = currentDateString.substring(0,2);
        var nextDateMonth = nextDateString.substring(0,2);

        var currentDateDate = Number(currentDateString.substring(3,5));
        
        if(currentDateMonth == nextDateMonth || currentDateDate<28){
            contributionFlagArray[i] = "N";
        } else {
            contributionFlagArray[i] = "Y";
        }
    
        gapToATHArray[i] = ((currentPrice / allTimeHighArray[i]) - 1) * -1;
        //console.log("Daily close price: "+currentPrice+" / ATH: "+allTimeHighArray[i]);
    
        if(contributionFlagArray[i] == "Y"){
            contributionArray[i] = monthlyContribution;
        } else{
            contributionArray[i] = 0;
        }

        //skip value if the start year is not in range yet, exit loop if the end year has already been passed
        var currentYearString = String(dailyDateArray[i]);
        var currentYear = Number(currentYearString.substring(currentYearString.length-4,currentYearString.length));

        if(currentYear < minSelectedYear){
            startDateOffset++;
            continue;
        }

        if(currentYear > maxSelectedYear){
            break;
        }

        selectedDateArray[i] = dailyDateArray[i];
        selectedDailyPriceArray[i] = dailyClosePriceArray[i];
        selectedAllTimeHighArray[i] = allTimeHighArray[i];
        selectedGapToATHArray[i] = gapToATHArray[i];

        //calculate total value for 100% cash strategy (P3)
        if(i==0 || i == startDateOffset) {
            cumulativeContributionArray[i] = initialContribution;
        } else {
            cumulativeContributionArray[i] = cumulativeContributionArray[i-1] +         cumulativeContributionArray[i-1] * (Math.pow((1+cashInterestRate),(1/daysInYear))-1) +
            contributionArray[i];
        }

        //P1
        P1InvestFlagArray[i] = "Y";
    
        if(i==0 || i == startDateOffset){
            P1CashBOPArray[i] = initialContribution;
            P1SharesBOPArray[i] = 0;
        } else{
            P1CashBOPArray[i] = P1CashEOPArray[i-1];
            P1SharesBOPArray[i] = P1SharesEOPArray[i-1];        
        }
    
        P1CashInterestArray[i] = P1CashBOPArray[i] * (Math.pow((1+cashInterestRate),(1/daysInYear))-1);
    
        P1DividendsReceivedArray[i] = P1SharesBOPArray[i] * dailyDividendArray[i];
    
        if(P1InvestFlagArray[i] == "Y"){
            P1AmountInvestedArray[i] = P1CashBOPArray[i] + P1CashInterestArray[i] + contributionArray[i] + P1DividendsReceivedArray[i];
        } else{
            P1AmountInvestedArray[i] = 0;
        }
    
        P1CashEOPArray[i] = P1CashBOPArray[i] + P1CashInterestArray[i] + contributionArray[i] + P1DividendsReceivedArray[i] - P1AmountInvestedArray[i];
    
        P1SharesPurchasedArray[i] = Math.max( ((P1AmountInvestedArray[i] - tradingTransactionFee) / dailyClosePriceArray[i]), 0);
        P1SharesEOPArray[i] = P1SharesBOPArray[i] + P1SharesPurchasedArray[i];
    
        P1StockBalanceArray[i] = P1SharesEOPArray[i] * dailyClosePriceArray[i];
        P1NetWorthArray[i] = P1CashEOPArray[i] + P1StockBalanceArray[i];
    
        //P2
        if(gapToATHArray[i] >= P2ATHGapThreshold){
            P2InvestFlagArray[i] = "Y";
        } else{
            P2InvestFlagArray[i] = "N";
        }

        //console.log("Gap to ATH: "+ gapToATHArray[i]);
        //console.log("P2 invest? "+ P2InvestFlagArray[i]);
    
        if(i==0 || i == startDateOffset){
            P2CashBOPArray[i] = initialContribution;
            P2SharesBOPArray[i] = 0;
        } else{
            P2CashBOPArray[i] = P2CashEOPArray[i-1];
            P2SharesBOPArray[i] = P2SharesEOPArray[i-1];        
        }
    
        P2CashInterestArray[i] = P2CashBOPArray[i] * (Math.pow((1+cashInterestRate),(1/daysInYear))-1);
    
        P2DividendsReceivedArray[i] = P2SharesBOPArray[i] * dailyDividendArray[i];
    
        if(P2InvestFlagArray[i] == "Y"){
            P2AmountInvestedArray[i] = P2CashBOPArray[i] + P2CashInterestArray[i] + contributionArray[i] + P2DividendsReceivedArray[i];
        } else{
            P2AmountInvestedArray[i] = 0;
        }
    
        P2CashEOPArray[i] = P2CashBOPArray[i] + P2CashInterestArray[i] + contributionArray[i] + P2DividendsReceivedArray[i] - P2AmountInvestedArray[i];
    
        P2SharesPurchasedArray[i] = Math.max( ((P2AmountInvestedArray[i] - tradingTransactionFee) / dailyClosePriceArray[i]), 0);
        P2SharesEOPArray[i] = P2SharesBOPArray[i] + P2SharesPurchasedArray[i];
    
        P2StockBalanceArray[i] = P2SharesEOPArray[i] * dailyClosePriceArray[i];
        P2NetWorthArray[i] = P2CashEOPArray[i] + P2StockBalanceArray[i];

        //Record stock / cash values
        selectedP2CashBalanceArray[i] = P2CashEOPArray[i];
        selectedP2StockBalanceArray[i] = P2StockBalanceArray[i];
        selectedP2CashWeightArray[i] = P2CashEOPArray[i] / P2NetWorthArray[i];
        selectedP2StockWeightArray[i] = P2StockBalanceArray[i] / P2NetWorthArray[i];

        selectedNetWorthGapArray[i] = P1NetWorthArray[i] - P2NetWorthArray[i];

    }

}

function showOutputs(){

    console.log("Start date offset: "+startDateOffset);

    //trim output arrays if a delayed start date is used
    selectedP1NetWorthArray = P1NetWorthArray.slice();
    selectedP1NetWorthArray.splice(0,startDateOffset);

    selectedP2NetWorthArray = P2NetWorthArray.slice();
    selectedP2NetWorthArray.splice(0,startDateOffset);

    selectedCumulativeContributionArray = cumulativeContributionArray.slice();
    selectedCumulativeContributionArray.splice(0,startDateOffset);

    selectedDateArray.splice(0,startDateOffset);

    selectedDailyPriceArray.splice(0,startDateOffset);
    selectedAllTimeHighArray.splice(0,startDateOffset);
    selectedGapToATHArray.splice(0,startDateOffset);

    selectedP2CashBalanceArray.splice(0,startDateOffset);
    selectedP2StockBalanceArray.splice(0,startDateOffset);
    selectedP2CashWeightArray.splice(0,startDateOffset);
    selectedP2StockWeightArray.splice(0,startDateOffset);

    selectedNetWorthGapArray.splice(0,startDateOffset);

    //fill table with final portfolio values / annualized % figures
    P1EndValueCell.innerHTML = "$"+Math.round(selectedP1NetWorthArray[selectedP1NetWorthArray.length-1]).toLocaleString();
    P2EndValueCell.innerHTML = "$"+Math.round(selectedP2NetWorthArray[selectedP2NetWorthArray.length-1]).toLocaleString();
    P3EndValueCell.innerHTML = "$"+Math.round(selectedCumulativeContributionArray[selectedCumulativeContributionArray.length-1]).toLocaleString();

    selectedStartDate = convertObjectToDate(selectedDateArray[0]);
    console.log("Selected start date: "+selectedStartDate);

    selectedEndDate = convertObjectToDate(selectedDateArray[selectedDateArray.length-1]);
    console.log("Selected end date: "+selectedEndDate);
    
    finalPortfolioDateCell.innerHTML = "Final Portfolio Value <br><span class=\"smallLabel\">("+formatDate(selectedEndDate)+")</span>";

    P2LabelCell.innerHTML = "Only invest when the market is down by "+(Math.round(P2ATHGapThreshold*1000)/10)+"%+ from the all-time high";


    monthsBetweenSelectedDateRange = calcNumMonthsBetween(selectedStartDate, selectedEndDate);
    console.log("Months in date range: "+monthsBetweenSelectedDateRange);

    averageAnnualReturnCell.innerHTML = "Average Annual Return<br><span class=\"smallLabel\">(over "+(Math.round(monthsBetweenSelectedDateRange/12*10)/10)+" yrs)</span>";


    //use solveRate function and annualize

    var solveRate1 = solveRate(monthsBetweenSelectedDateRange,monthlyContribution*-1,initialContribution*-1,selectedP1NetWorthArray[selectedP1NetWorthArray.length-1]);
    var solveRate2 = solveRate(monthsBetweenSelectedDateRange,monthlyContribution*-1,initialContribution*-1,selectedP2NetWorthArray[selectedP2NetWorthArray.length-1]);
    var solveRate3 = solveRate(monthsBetweenSelectedDateRange,monthlyContribution*-1,initialContribution*-1,selectedCumulativeContributionArray[selectedCumulativeContributionArray.length-1]);

    var P1IRR = Math.pow(1+solveRate1,12)-1;
    var P2IRR = Math.pow(1+solveRate2,12)-1;
    var P3IRR = Math.pow(1+solveRate3,12)-1;

    if(monthsBetweenSelectedDateRange < 12 || solveRate1 === null){
        P1ReturnCell.innerHTML = "n/a";
    } else{
        P1ReturnCell.innerHTML = (Math.round(P1IRR*1000)/10)+"%";
    }

    if(monthsBetweenSelectedDateRange < 12 || solveRate2 === null){
        P2ReturnCell.innerHTML = "n/a";
    } else{
        P2ReturnCell.innerHTML = (Math.round(P2IRR*1000)/10)+"%";
    }

    if(monthsBetweenSelectedDateRange < 12 || solveRate3 === null){
        P3ReturnCell.innerHTML = "n/a";
    } else{
        P3ReturnCell.innerHTML = (Math.round(P3IRR*1000)/10)+"%";
    }


    /*
    //count frequencies of ATH gaps (% of days within 1% of ATH, 3%, 5%, 10%, etc.)
    numSelectedDays = selectedDateArray.length;

    for (i=0; i<numSelectedDays; i++){
        var currentGapToATH = selectedGapToATHArray[i];

        if(currentGapToATH == 0){
            countAtATH ++;
        }
        
        if(currentGapToATH <= 0.01){
            countWithin1Pct ++;
        }
        
        if(currentGapToATH <= 0.03){
            countWithin3Pct ++;
        }
        
        if(currentGapToATH <= 0.05){
            countWithin5Pct ++;
        }
        
        if(currentGapToATH <= 0.10){
            countWithin10Pct ++;
        }
        
        if(currentGapToATH <= 0.20){
            countWithin20Pct ++;
        }
        
        if(currentGapToATH <= 0.30){
            countWithin30Pct ++;
        }
        
        if(currentGapToATH <= 0.40){
            countWithin40Pct ++;
        }
        
        if(currentGapToATH <= 0.50){
            countWithin50Pct ++;
        }
        
        if(currentGapToATH <= 0.60){
            countWithin60Pct ++;
        }
        
        if(currentGapToATH > 0.6){
            countMoreThan60Pct ++;
        }
    }

    //Fill HTML table showing frequency of days within x% of current all-time high
    
    daysAtATHNumCell.innerHTML = countAtATH.toLocaleString();
    daysAtATHPctCell.innerHTML = Math.round(countAtATH / numSelectedDays * 1000)/10+"%";

    daysWithin1NumCell.innerHTML = countWithin1Pct.toLocaleString();
    daysWithin1PctCell.innerHTML = Math.round(countWithin1Pct / numSelectedDays * 1000)/10+"%";

    daysWithin3NumCell.innerHTML = countWithin3Pct.toLocaleString();
    daysWithin3PctCell.innerHTML = Math.round(countWithin3Pct / numSelectedDays * 1000)/10+"%";

    daysWithin5NumCell.innerHTML = countWithin5Pct.toLocaleString();
    daysWithin5PctCell.innerHTML = Math.round(countWithin5Pct / numSelectedDays * 1000)/10+"%";

    daysWithin10NumCell.innerHTML = countWithin10Pct.toLocaleString();
    daysWithin10PctCell.innerHTML = Math.round(countWithin10Pct / numSelectedDays * 1000)/10+"%";

    daysWithin20NumCell.innerHTML = countWithin20Pct.toLocaleString();
    daysWithin20PctCell.innerHTML = Math.round(countWithin20Pct / numSelectedDays * 1000)/10+"%";

    daysWithin30NumCell.innerHTML = countWithin30Pct.toLocaleString();
    daysWithin30PctCell.innerHTML = Math.round(countWithin30Pct / numSelectedDays * 1000)/10+"%";

    daysWithin40NumCell.innerHTML = countWithin40Pct.toLocaleString();
    daysWithin40PctCell.innerHTML = Math.round(countWithin40Pct / numSelectedDays * 1000)/10+"%";

    daysWithin50NumCell.innerHTML = countWithin50Pct.toLocaleString();
    daysWithin50PctCell.innerHTML = Math.round(countWithin50Pct / numSelectedDays * 1000)/10+"%";

    daysWithin60NumCell.innerHTML = countWithin60Pct.toLocaleString();
    daysWithin60PctCell.innerHTML = Math.round(countWithin60Pct / numSelectedDays * 1000)/10+"%";

    daysMoreThan60NumCell.innerHTML = countMoreThan60Pct.toLocaleString();
    daysMoreThan60PctCell.innerHTML = Math.round(countMoreThan60Pct / numSelectedDays * 1000)/10+"%";

    totalDaysNumCell.innerHTML = numSelectedDays.toLocaleString();
    totalDaysPctCell.innerHTML = "100%";
    */

    //draw line chart of portfolio value over time for each investing strategy
    var chartData = [];
    
    chartData[0] = {
        label: "Invest whenever you have cash",
        data: selectedP1NetWorthArray,
        backgroundColor: "#00A08A",
        hoverBackgroundColor: "#00A08A",
        borderColor: "#00A08A",
        borderStyle: 'solid',
        borderWidth: 2,
        fill: false,
        lineTension:0,
        pointBorderWidth: 0,
        pointRadius:0,
        pointHoverRadius:4,
    }

    chartData[1] = {
        label: "Only invest when the market is down by "+(Math.round(P2ATHGapThreshold*1000)/10)+"%+ from the all-time high",
        data: selectedP2NetWorthArray,
        backgroundColor: "#F2AD00",
        hoverBackgroundColor: "#F2AD00",
        borderColor: "#F2AD00",
        borderStyle: 'solid',
        borderWidth: 2,
        fill: false,
        lineTension:0,
        pointBorderWidth: 0,
        pointRadius:0,
        pointHoverRadius:4,
    }

    chartData[2] = {
        label:"All cash strategy (incl. interest)",
        data: selectedCumulativeContributionArray,
        backgroundColor: "#273046",
        hoverBackgroundColor: "#273046",
        borderColor: '#273046',
        borderStyle: 'solid',
        borderWidth: 2,
        fill: false,
        lineTension:0,
        pointBorderWidth: 0,
        pointRadius:0,
        pointHoverRadius:4,        
    }

    var ctx = document.getElementById('portfolioValueChart').getContext('2d');

    chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
    
        // The data for our dataset
        data: {
            labels: selectedDateArray,
            datasets: chartData,
        },
    
        // Configuration options go here
        options: {

            maintainAspectRatio: false,
        
            tooltips: {
                
                // Include a dollar sign in the ticks and add comma formatting
                callbacks: {
                    label: function(tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';

                        if (label) {
                            label += ': ';
                        }
                        label += '$'+tooltipItem.yLabel.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0, });
                        return label;
                    }
                },
            },

            scales: {
                yAxes: [{
                    ticks: {
                        // Include a dollar sign in the ticks and add comma formatting
                        callback: function(value, index, values) {
                            return '$' + (value).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0, })+" ";
                        },

                        fontColor: "rgb(56,56,56)",
                    },

                    //type: portfolioValueChartAxisType,

                    scaleLabel: {
                        display: true,
                        labelString: "$ Value",
                        fontColor: "rgb(56,56,56)",
                        fontStyle: "bold",
                        fontSize: 15,
                    },

                    gridLines: {
                        drawTicks: false,
                        zeroLineColor: "rgb(56,56,56)",
                        zeroLineWidth: 2,
                    },
                }],

                xAxes: [{
                    ticks: {
                        userCallback: function(item, index) {
                            if (!(index % tickSpacing)) return item.substring(item.length-4, item.length);
                        },
                        autoSkip: false,
                        fontColor: "rgb(56,56,56)",

                        padding: 5,
                        maxRotation: 90,
                        minRotation: 90,

                    },

                    scaleLabel: {
                        display: true,
                        labelString: "Date",
                        fontColor: "rgb(56,56,56)",
                        fontStyle: "bold",
                        fontSize: 15,
                    },

                    gridLines: {
                        drawTicks: false,
                        zeroLineColor: "rgb(56,56,56)",
                        zeroLineWidth: 2,
                    },
                }],    
            },

            legend: {

                display: true,

                labels: {
                    fontColor: "rgb(56,56,56)",
                    boxWidth: 13,
                    padding: 10,
                },
            },

            title: {
                display: true,
                text: "Portfolio Value Over Time",
                fontSize: 18,
                fontColor: "rgb(56,56,56)",
                padding: 2,
            },

            layout: {
                padding: {
                    // Any unspecified dimensions are assumed to be 0                     
                    top: 3,
                    right: 5,
                    left: 5,
                    bottom: 3,
                }
            }

        }
    });

    //draw line chart of VFINX share price over time, and current all-time high price
    var chartData2 = [];

    chartData2[0] = {
        label: "VFINX index price",
        data: selectedDailyPriceArray,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        hoverBackgroundColor: "rgba(0, 0, 0, 0.7)",
        borderColor: 'rgba(0, 0, 0, 0.7)',
        borderStyle: 'solid',
        borderWidth: 2,
        fill: false,
        lineTension:0,
        pointBorderWidth: 0,
        pointRadius:0,
        pointHoverRadius:4,
    }

    chartData2[1] = {
        label: "Current all-time high price",
        data: selectedAllTimeHighArray,
        backgroundColor: "#FD6467",
        hoverBackgroundColor: "#FD6467",
        borderColor: "#FD6467",
        borderStyle: 'solid',
        borderWidth: 4,
        fill: false,
        lineTension:0,
        pointBorderWidth: 0,
        pointRadius:0,
        pointHoverRadius:5,
    }

    var ctx2 = document.getElementById('VFINXPriceChart').getContext('2d');

    chart2 = new Chart(ctx2, {
        // The type of chart we want to create
        type: 'line',
    
        // The data for our dataset
        data: {
            labels: selectedDateArray,
            datasets: chartData2,
        },
    
        // Configuration options go here
        options: {

            maintainAspectRatio: false,
        
            tooltips: {
                
                // Include a dollar sign in the ticks and add comma formatting
                callbacks: {
                    label: function(tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';

                        if (label) {
                            label += ': ';
                        }
                        label += '$'+tooltipItem.yLabel.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2, });
                        return label;
                    }
                },
            },

            scales: {
                yAxes: [{
                    ticks: {
                        // Include a dollar sign in the ticks and add comma formatting
                        callback: function(value, index, values) {
                            return '$' + (value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2, })+" ";
                        },

                        fontColor: "rgb(56,56,56)",
                    },

                    scaleLabel: {
                        display: true,
                        labelString: "Price per share",
                        fontColor: "rgb(56,56,56)",
                        fontStyle: "bold",
                        fontSize: 15,
                    },

                    gridLines: {
                        drawTicks: false,
                        zeroLineColor: "rgb(56,56,56)",
                        zeroLineWidth: 2,
                    },
                }],

                xAxes: [{
                    ticks: {
                        userCallback: function(item, index) {
                            if (!(index % tickSpacing)) return item.substring(item.length-4, item.length);
                        },
                        autoSkip: false,
                        fontColor: "rgb(56,56,56)",

                        padding: 5,
                        maxRotation: 90,
                        minRotation: 90,

                    },

                    scaleLabel: {
                        display: true,
                        labelString: "Date",
                        fontColor: "rgb(56,56,56)",
                        fontStyle: "bold",
                        fontSize: 15,
                    },

                    gridLines: {
                        drawTicks: false,
                        zeroLineColor: "rgb(56,56,56)",
                        zeroLineWidth: 2,
                    },
                }],    
            },

            legend: {

                display: true,

                labels: {
                    fontColor: "rgb(56,56,56)",
                    boxWidth: 13,
                    padding: 10,
                },
            },

            title: {
                display: true,
                text: "S&P 500 Performance Over Time (VFINX Index Fund)",
                fontSize: 18,
                fontColor: "rgb(56,56,56)",
                padding: 2,
            },

            layout: {
                padding: {
                    // Any unspecified dimensions are assumed to be 0                     
                    top: 3,
                    right: 5,
                    left: 5,
                    bottom: 3,
                }
            }

        }
    });

    //draw bar chart for % gap to all-time high over time
    var ctx3 = document.getElementById('gapToATHChart').getContext('2d');

    chart3 = new Chart(ctx3, {
        // The type of chart we want to create
        type: 'bar',
    
        // The data for our dataset
        data: {
            labels: selectedDateArray,
            datasets: [{
                data: selectedGapToATHArray,
                backgroundColor: "#7294D4",
                borderColor: "#7294D4",
                borderWidth:0,
            }],
        },
        // Configuration options go here
        options: {

            maintainAspectRatio: false,
        
            tooltips: {
                
                // one decimal and % symbol in the tooltip
                callbacks: {
                    label: function(tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';

                        if (label) {
                            label += ': ';
                        }
                        label += (Math.round(tooltipItem.yLabel*1000)/10).toLocaleString()+"%";
                        return label;
                    }
                },
            },

            scales: {
                yAxes: [{
                    ticks: {
                    // one decimal and % symbol
                    callback: function(value, index, values) {
                            return (Math.round(value*1000)/10).toLocaleString()+"% ";
                        },

                        fontColor: "rgb(56,56,56)",
                        min: 0,
                    },

                    scaleLabel: {
                        display: true,
                        labelString: "% gap to current all-time high",
                        fontColor: "rgb(56,56,56)",
                        fontStyle: "bold",
                        fontSize: 15,
                    },

                    gridLines: {
                        drawTicks: false,
                        zeroLineColor: "rgb(56,56,56)",
                        zeroLineWidth: 2,
                    },

                }],

                xAxes: [{
                    ticks: {
                        userCallback: function(item, index) {
                            if (!(index % tickSpacing)) return item.substring(item.length-4, item.length);
                        },
                        autoSkip: false,
                        fontColor: "rgb(56,56,56)",

                        padding: 5,
                        maxRotation: 90,
                        minRotation: 90,

                    },

                    scaleLabel: {
                        display: true,
                        labelString: "Date",
                        fontColor: "rgb(56,56,56)",
                        fontStyle: "bold",
                        fontSize: 15,
                    },

                    gridLines: {
                        drawTicks: false,
                        zeroLineColor: "rgb(56,56,56)",
                        zeroLineWidth: 2,
                    },

                    //categoryPercentage: 1.0,
                    barThickness: 4,  // number (pixels) or 'flex'
                    maxBarThickness: 8, // number (pixels)
                    //barPercentage: 1.0,
                    //maxBarThickness: 100,
                }],    
            },

            legend: {

                display: false,

                labels: {
                    fontColor: "rgb(56,56,56)",
                    boxWidth: 13,
                    padding: 10,
                },
            },

            title: {
                display: true,
                text: "% Gap to Current All-Time High Price (S&P 500 / VFINX)",
                fontSize: 18,
                fontColor: "rgb(56,56,56)",
                padding: 2,
            },

            layout: {
                padding: {
                    // Any unspecified dimensions are assumed to be 0                     
                    top: 3,
                    right: 5,
                    left: 5,
                    bottom: 3,
                }
            }
        }
    });


    //draw bar chart cash / stock values for P2

    var chartData4 = [];

    chartData4[0] = {
        data: selectedP2CashBalanceArray,
        backgroundColor: "#273046",
        borderColor: "#273046",
        borderWidth:0,
        label: "Cash",
    }

    chartData4[1] = {
        data: selectedP2StockBalanceArray,
        backgroundColor: "#F4B5BD",
        borderColor: "#F4B5BD",
        borderWidth:0,
        label: "Stock",
    }

    var ctx4 = document.getElementById('P2CashStockChart').getContext('2d');

    chart4 = new Chart(ctx4, {
        // The type of chart we want to create
        type: 'bar',
    
        // The data for our dataset
        data: {
            labels: selectedDateArray,
            datasets: chartData4,
        },
        // Configuration options go here
        options: {

            maintainAspectRatio: false,
        
            tooltips: {
                
                // one decimal and % symbol in the tooltip
                callbacks: {
                    label: function(tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';

                        if (label) {
                            label += ': ';
                        }
                        label += "$"+(Math.round(tooltipItem.yLabel)).toLocaleString();
                        return label;
                    }
                },
            },

            scales: {
                yAxes: [{
                    ticks: {
                    // one decimal and % symbol
                    callback: function(value, index, values) {
                            return "$"+(Math.round(value)).toLocaleString();
                        },

                        fontColor: "rgb(56,56,56)",
                    },

                    scaleLabel: {
                        display: true,
                        labelString: "$ value",
                        fontColor: "rgb(56,56,56)",
                        fontStyle: "bold",
                        fontSize: 15,
                    },

                    gridLines: {
                        drawTicks: false,
                        zeroLineColor: "rgb(56,56,56)",
                        zeroLineWidth: 2,
                    },

                    stacked: true,
                }],

                xAxes: [{
                    ticks: {
                        userCallback: function(item, index) {
                            if (!(index % tickSpacing)) return item.substring(item.length-4, item.length);
                        },
                        autoSkip: false,
                        fontColor: "rgb(56,56,56)",

                        padding: 5,
                        maxRotation: 90,
                        minRotation: 90,

                    },

                    scaleLabel: {
                        display: true,
                        labelString: "Date",
                        fontColor: "rgb(56,56,56)",
                        fontStyle: "bold",
                        fontSize: 15,
                    },

                    gridLines: {
                        drawTicks: false,
                        zeroLineColor: "rgb(56,56,56)",
                        zeroLineWidth: 2,
                    },

                    //categoryPercentage: 1.0,
                    barThickness: 4,  // number (pixels) or 'flex'
                    maxBarThickness: 8, // number (pixels)
                    //barPercentage: 1.0,
                    //maxBarThickness: 100,

                    stacked: true,
                }],    
            },

            legend: {

                display: true,

                labels: {
                    fontColor: "rgb(56,56,56)",
                    boxWidth: 13,
                    padding: 10,
                },
            },

            title: {
                display: true,
                text: "Market Timing Strategy - Cash and Stock Values",
                fontSize: 18,
                fontColor: "rgb(56,56,56)",
                padding: 2,
            },

            layout: {
                padding: {
                    // Any unspecified dimensions are assumed to be 0                     
                    top: 3,
                    right: 5,
                    left: 5,
                    bottom: 3,
                }
            }
        }
    });


    //draw bar chart cash / stock % weights for P2
    var chartData5 = [];

    chartData5[0] = {
        data: selectedP2CashWeightArray,
        backgroundColor: "#273046",
        borderColor: "#273046",
        borderWidth:0,
        label:"Cash",
    }

    chartData5[1] = {
        data: selectedP2StockWeightArray,
        backgroundColor: "#F4B5BD",
        borderColor: "#F4B5BD",
        borderWidth:0,
        label:"Stock",
    }

    var ctx5 = document.getElementById('P2CashStockWeightChart').getContext('2d');

    chart5 = new Chart(ctx5, {
        // The type of chart we want to create
        type: 'bar',
    
        // The data for our dataset
        data: {
            labels: selectedDateArray,
            datasets: chartData5,
        },
        // Configuration options go here
        options: {

            maintainAspectRatio: false,
        
            tooltips: {
                
                // one decimal and % symbol in the tooltip
                callbacks: {
                    label: function(tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';

                        if (label) {
                            label += ': ';
                        }
                        label += (Math.round(tooltipItem.yLabel*1000)/10).toLocaleString()+"%";
                        return label;
                    }
                },
            },

            scales: {
                yAxes: [{
                    ticks: {
                    // one decimal and % symbol
                    callback: function(value, index, values) {
                            return (Math.round(value*1000)/10).toLocaleString()+"%";
                        },

                        fontColor: "rgb(56,56,56)",
                        max: 1,
                        min: 0,
                    },

                    scaleLabel: {
                        display: true,
                        labelString: "% of portfolio",
                        fontColor: "rgb(56,56,56)",
                        fontStyle: "bold",
                        fontSize: 15,
                    },

                    gridLines: {
                        drawTicks: false,
                        zeroLineColor: "rgb(56,56,56)",
                        zeroLineWidth: 2,
                    },

                    stacked: true,
                }],

                xAxes: [{
                    ticks: {
                        userCallback: function(item, index) {
                            if (!(index % tickSpacing)) return item.substring(item.length-4, item.length);
                        },
                        autoSkip: false,
                        fontColor: "rgb(56,56,56)",

                        padding: 5,
                        maxRotation: 90,
                        minRotation: 90,

                    },

                    scaleLabel: {
                        display: true,
                        labelString: "Date",
                        fontColor: "rgb(56,56,56)",
                        fontStyle: "bold",
                        fontSize: 15,
                    },

                    gridLines: {
                        drawTicks: false,
                        zeroLineColor: "rgb(56,56,56)",
                        zeroLineWidth: 2,
                    },

                    //categoryPercentage: 1.0,
                    barThickness: 4,  // number (pixels) or 'flex'
                    maxBarThickness: 8, // number (pixels)
                    //barPercentage: 1.0,
                    //maxBarThickness: 100,

                    stacked: true,
                }],    
            },

            legend: {

                display: true,

                labels: {
                    fontColor: "rgb(56,56,56)",
                    boxWidth: 13,
                    padding: 10,
                },
            },

            title: {
                display: true,
                text: "Market Timing Strategy - % of Portfolio in Cash and Stock",
                fontSize: 18,
                fontColor: "rgb(56,56,56)",
                padding: 2,
            },

            layout: {
                padding: {
                    // Any unspecified dimensions are assumed to be 0                     
                    top: 3,
                    right: 5,
                    left: 5,
                    bottom: 3,
                }
            }
        }
    });

    //draw line chart of difference in net worth -- regular investing vs market timing
    var chartData6 = [];

    chartData6[0] = {
        label: "Difference in net worth",
        data: selectedNetWorthGapArray,
        backgroundColor: "rgb(114, 0, 129)",
        hoverBackgroundColor: "rgb(114, 0, 129)",
        borderColor: 'rgb(114, 0, 129)',
        borderStyle: 'solid',
        borderWidth: 2,
        fill: false,
        lineTension:0,
        pointBorderWidth: 0,
        pointRadius:0,
        pointHoverRadius:4,
    }

    var ctx6 = document.getElementById('netWorthDifferenceChart').getContext('2d');

    chart6 = new Chart(ctx6, {
        // The type of chart we want to create
        type: 'line',
    
        // The data for our dataset
        data: {
            labels: selectedDateArray,
            datasets: chartData6,
        },
    
        // Configuration options go here
        options: {

            maintainAspectRatio: false,
        
            tooltips: {
                
                // Include a dollar sign in the ticks and add comma formatting
                callbacks: {
                    label: function(tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';

                        if (label) {
                            label += ': ';
                        }
                        
                        if(tooltipItem.yLabel >0){
                            label += '+$'+tooltipItem.yLabel.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0, });
                        } else {
                            label += '-$'+Math.abs(tooltipItem.yLabel).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0, });
                        }

                        return label;
                        
                    }
                },
            },

            scales: {
                yAxes: [{
                    ticks: {
                        // Include a dollar sign in the ticks and add comma formatting
                        callback: function(value, index, values) {
                            
                            if(value>=0){
                                return '+$' + (value).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0, })+" ";
                            } else{
                                return '-$' + Math.abs(value).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0, })+" ";
                            }
                        },

                        fontColor: "rgb(56,56,56)",
                    },

                    scaleLabel: {
                        display: true,
                        labelString: "Difference in net worth",
                        fontColor: "rgb(56,56,56)",
                        fontStyle: "bold",
                        fontSize: 15,
                    },

                    gridLines: {
                        drawTicks: false,
                        zeroLineColor: "rgb(56,56,56)",
                        zeroLineWidth: 2,
                    },
                }],

                xAxes: [{
                    ticks: {
                        userCallback: function(item, index) {
                            if (!(index % tickSpacing)) return item.substring(item.length-4, item.length);
                        },
                        autoSkip: false,
                        fontColor: "rgb(56,56,56)",

                        padding: 5,
                        maxRotation: 90,
                        minRotation: 90,

                    },

                    scaleLabel: {
                        display: true,
                        labelString: "Date",
                        fontColor: "rgb(56,56,56)",
                        fontStyle: "bold",
                        fontSize: 15,
                    },

                    gridLines: {
                        drawTicks: false,
                        zeroLineColor: "rgb(56,56,56)",
                        zeroLineWidth: 2,
                    },
                }],    
            },

            legend: {

                display: true,

                labels: {
                    fontColor: "rgb(56,56,56)",
                    boxWidth: 13,
                    padding: 10,
                },
            },

            title: {
                display: true,
                text: "Difference in Net Worth - Regular Investing vs Market Timing",
                fontSize: 18,
                fontColor: "rgb(56,56,56)",
                padding: 2,
            },

            layout: {
                padding: {
                    // Any unspecified dimensions are assumed to be 0                     
                    top: 3,
                    right: 5,
                    left: 5,
                    bottom: 3,
                }
            }

        }
    });

    activeChartFlag = true;

    //show or hide outputs depending on whether the assumptions have been filled in by the user
    if(monthlyContribution>0 || initialContribution>0){
        outputContainerDiv.classList.remove("hide");
        console.log("Show outputs -- called from showOutputs method");
    }

    if(monthlyContribution<=0 && initialContribution<=0){
        outputContainerDiv.classList.add("hide");
        console.log("Hide outputs -- called from showOutputs method");
    }

}

function showTextOutputs(){

    var endingValueP1 = selectedP1NetWorthArray[selectedP1NetWorthArray.length-1];
    var endingValueP2 = selectedP2NetWorthArray[selectedP2NetWorthArray.length-1];
    var netWorthDelta = endingValueP1 - endingValueP2;

    if(netWorthDelta >= 0){
        outputPara1.innerHTML = "Final portfolio value after "+Math.round(monthsBetweenSelectedDateRange/12*10)/10+" years:"
        +"<ul><li><b>Investing whenever you have cash on hand</b>: your portfolio would be worth <span class=\"highlightText1\">$"+Math.round(endingValueP1).toLocaleString()+"</span></li>"
        +"<li><b>Market timing</b>: your portfolio would be worth <span class=\"highlightText2\">$"+Math.round(endingValueP2).toLocaleString()+"</span></li></ul>"
        +"In this case, the regular investing investing strategy <span class=\"highlightText3\">outperformed</span> the market timing strategy by <span class=\"highlightText3\">$"+Math.round(netWorthDelta).toLocaleString()+"</span>.";
    } else{
        outputPara1.innerHTML = "Final portfolio value after "+Math.round(monthsBetweenSelectedDateRange/12*10)/10+" years:"
        +"<ul><li><b>Investing whenever you have cash on hand</b>: your portfolio would be worth <span class=\"highlightText1\">$"+Math.round(endingValueP1).toLocaleString()+"</span></li>"
        +"<li><b>Market timing</b>: your portfolio would be worth <span class=\"highlightText2\">$"+Math.round(endingValueP2).toLocaleString()+"</span></li></ul>"
        +"In this case, the regular investing investing strategy <span class=\"highlightText4\">underperformed</span> the market timing strategy by <span class=\"highlightText4\">$"+Math.round(Math.abs(netWorthDelta)).toLocaleString()+"</span>.";
    }

}


//converts an object in MM-DD-YYYY format into a javascript date value
function convertObjectToDate(dateObject){

    var dateValue;

    var dateString = String(dateObject);
    
    var year = dateString.substring(dateString.length-4,dateString.length);
    var month = dateString.substring(0,2);
    var day = dateString.substring(3,5);

    dateValue = new Date(year, month-1, day);

    return dateValue;
}

function formatDate(dateValue){

    var formattedDate = dateValue.getMonth()+1+"-"+dateValue.getDate()+"-"+dateValue.getFullYear();

    return formattedDate;
}

function calcNumMonthsBetween(startDate, endDate){
    var numMonthsBetween = (endDate.getFullYear() - startDate.getFullYear())*12 + (endDate.getMonth() - startDate.getMonth())*1 + (endDate.getDate() - startDate.getDate())/30;
    
    return numMonthsBetween;
}


//Homebrew method to solve for rate
//Only works with end of period payment
//Only works with negative pmt and pv / positive FV
//Works best if monthly
function solveRate(nper, pmt, pv, fv) {

    pv = Math.abs(pv);
    pmt = Math.abs(pmt);
    fv = Math.abs(fv);

    var nperWhole = Math.floor(nper);
    var nperPartial = nper - nperWhole;

    var trialFV = 0;
    var maxIterations = 1000;
    var maxAllowedError = fv * 0.005;
    var rateStep = 0.00004;

    var previousTrialFV = 0;

    //try 6 different starting guesses, pick the closest one to start the iterative process
    var guessRate1 = Math.pow(1+0.2,1/12)-1;
    var guessRate2 = Math.pow(1+0.1,1/12)-1;
    var guessRate3 = Math.pow(1+cashInterestRate,1/12)-1;
    var guessRate4 = 0;
    var guessRate5 = Math.pow(1-0.1,1/12)-1;
    var guessRate6 = Math.pow(1-0.2,1/12)-1;
    
    var guessRate = 0.001;

    var trialFV1 = 0;
    var trialFV2 = 0;
    var trialFV3 = 0;
    var trialFV4 = 0;
    var trialFV5 = 0;
    var trialFV6 = 0;


    if(pmt == 0){
        trialFV1 = Math.pow(1+guessRate1,nper) * pv;
        trialFV2 = Math.pow(1+guessRate2,nper) * pv;
        trialFV3 = Math.pow(1+guessRate3,nper) * pv;
        trialFV4 = Math.pow(1+guessRate4,nper) * pv;
        trialFV5 = Math.pow(1+guessRate5,nper) * pv;
        trialFV6 = Math.pow(1+guessRate6,nper) * pv;

    } else{
        trialFV1 = (pmt * ((Math.pow(1+guessRate1,nperWhole)-1) / guessRate1) + Math.pow(1+guessRate1,nperWhole) * pv) * (Math.pow(1+guessRate1,nperPartial));
        trialFV2 = (pmt * ((Math.pow(1+guessRate2,nperWhole)-1) / guessRate2) + Math.pow(1+guessRate2,nperWhole) * pv) * (Math.pow(1+guessRate2,nperPartial));
        
        if(guessRate3 == 0){
            trialFV3 = pmt * nperWhole + pv;
        } else{
            trialFV3 = (pmt * ((Math.pow(1+guessRate3,nperWhole)-1) / guessRate3) + Math.pow(1+guessRate3,nperWhole) * pv) * (Math.pow(1+guessRate3,nperPartial));
        }

        trialFV4 = pmt * nperWhole + pv;

        trialFV5 = (pmt * ((Math.pow(1+guessRate5,nperWhole)-1) / guessRate5) + Math.pow(1+guessRate5,nperWhole) * pv) * (Math.pow(1+guessRate5,nperPartial));
        trialFV6 = (pmt * ((Math.pow(1+guessRate6,nperWhole)-1) / guessRate6) + Math.pow(1+guessRate6,nperWhole) * pv) * (Math.pow(1+guessRate6,nperPartial));

        //console.log("Trial FV5: "+trialFV5+" assumptions: "+pmt+", "+guessRate5+", "+nperWhole+", "+pv+", "+nperPartial);
    }


    var trialGap1 = Math.abs(trialFV1 - fv);
    var trialGap2 = Math.abs(trialFV2 - fv);
    var trialGap3 = Math.abs(trialFV3 - fv);
    var trialGap4 = Math.abs(trialFV4 - fv);
    var trialGap5 = Math.abs(trialFV5 - fv);
    var trialGap6 = Math.abs(trialFV6 - fv);

    var bestTrialGap = Math.min(trialGap1, trialGap2, trialGap3, trialGap4, trialGap5, trialGap6);

    //console.log("FV: "+fv);
    //console.log("Trial gaps: "+trialGap1+", "+trialGap2+", "+trialGap3+", "+trialGap4+", "+trialGap5);

    if(bestTrialGap == trialGap1){
        guessRate = guessRate1;
    }

    if(bestTrialGap == trialGap2){
        guessRate = guessRate2;
    }

    if(bestTrialGap == trialGap3){
        guessRate = guessRate3;
    }

    if(bestTrialGap == trialGap4){
        guessRate = guessRate4;
    }

    if(bestTrialGap == trialGap5){
        guessRate = guessRate5;
    }

    if(bestTrialGap == trialGap6){
        guessRate = guessRate6;
    }

    console.log("Best guess rate: "+(Math.pow(1+guessRate,12)-1));


    //begin iterative process
    for(j=0; j<maxIterations; j++){

        if(pmt == 0){
            trialFV = Math.pow(1+guessRate,nper) * pv;
        } else{
            
            if(guessRate == 0){
                trialFV = pmt * nperWhole + pv;
            } else{
                trialFV = (pmt * ((Math.pow(1+guessRate,nperWhole)-1) / guessRate) + Math.pow(1+guessRate,nperWhole) * pv) * (Math.pow(1+guessRate,nperPartial));
            }
        }

        //console.log("Guess rate (annual): "+((Math.pow(1+guessRate,12))-1)+" / Trial FV: "+trialFV+" / actual FV: "+fv);
    
        //reduce step if the guess is bouncing around the true value (above, below, above, below, etc.)
        if((trialFV > fv && previousTrialFV < fv) || (trialFV < fv && previousTrialFV > fv)){
            rateStep = rateStep / 2;
        }
        previousTrialFV = trialFV;


        if(Math.abs(trialFV - fv) <= maxAllowedError){
            console.log("Max iteration count: "+j);
            return guessRate;
        } else if(trialFV > fv){
            guessRate = guessRate - rateStep;
        } else {
            guessRate = guessRate + rateStep;
        }

    }

    //if rate isn't found after the max iterations, return null
    return null;

}

function copyToClipboard(containerid) {
    if (screen.width >= 600) {
        if (document.selection) { 
            var range = document.body.createTextRange();
            range.moveToElementText(document.getElementById(containerid));
            range.select().createTextRange();
            document.execCommand("copy"); 
        
        } else if (window.getSelection) {
            var range = document.createRange();
            range.selectNode(document.getElementById(containerid));
            window.getSelection().addRange(range);
            document.execCommand("copy");
        }
    }
    else {
        return;
    }
}

