var principleInput = document.getElementById("principle");
var interestInput = document.getElementById("interestRate");
var tenureInput = document.getElementById("tenure");
var result = document.getElementById("result");
var emiText = document.getElementById("emi");
var interestText = document.getElementById("interest");
var totalPaymentText = document.getElementById("totalPayment");



function calculate() {


    var principle = parseFloat(principleInput.value);
    var monthlyInterestRate = parseFloat(interestInput.value)/1200;
    var monthlyTenure = parseFloat(tenureInput.value)*12;   // monthly tenure

    var emi = (monthlyInterestRate === 0)? (principle/monthlyTenure) :
        (principle*monthlyInterestRate*(Math.pow((1+monthlyInterestRate), monthlyTenure)))
        /(Math.pow((1+monthlyInterestRate), monthlyTenure) - 1);  // formula for calculating monthly EMI.

    result.style.visibility = "visible";


    if (isNaN(emi)){
        emiText.innerHTML = "Sorry, we coudn't calculate your EMI, check the inputs and try again.";
    }
    else {
        var totalEmi = emi*monthlyTenure;
        var totalInterest = totalEmi - principle;
        emiText.innerHTML = "Your monthly EMI = <span class=\"font-weight-bold\"> " + geoplugin_currencySymbol() + " " + emi.toLocaleString(undefined, {maximumFractionDigits: 2}) +"</span>";
        interestText.innerHTML = "Total Interest Payable = <span class=\"font-weight-bold\"> " + geoplugin_currencySymbol() + " " + totalInterest.toLocaleString(undefined, {maximumFractionDigits: 2}) +"</span>";
        totalPaymentText.innerHTML = "Total Amount Payable (Principle + Interest) = <span class=\"font-weight-bold\"> " + geoplugin_currencySymbol() + " " + totalEmi.toLocaleString(undefined, {maximumFractionDigits: 2}) +"</span>";
        showchart(totalInterest, principle);

    }
}




function showchart(interest, principle){
    Highcharts.chart('piechart', {
        chart: {
            spacingBottom: 0,
            spacingTop: 0,
            spacingLeft: 0,
            spacingRight: 0,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Breakdown: '
        },
        tooltip: {
            pointFormat: '<b> {point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Payment Type',
            colorByPoint: true,
            data: [{
                name: 'Total Interest',
                y: interest,
                sliced: true,
                selected: true
            }, {
                name: 'Principle',
                y: principle
            }]
        }]
    });

}
