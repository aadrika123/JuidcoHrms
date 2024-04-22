const da = 22000;
const hra = 33434;
const ada = 3343;
const basic_pay = 32400;
// const epf = 12;

// const gross = da + basic_pay;
const grossYearly = (da + hra + ada + basic_pay) * 12;
const grossPt = da + hra + ada + basic_pay;

const grossEsic = da + hra + ada + basic_pay;
// const grossEsic = 0;

test("EPF Case-1", () => {
    expect(((da + basic_pay) * 12) / 100).toBe(6528);
});

// test("ESIC Case-2", () => {
//     expect(((gross + hra + ada) * 1.75) / 100).toBe(1595.5975);
// });

test("ESIC Case-2", () => {
    let calculatedAmount = 0;
    if (grossEsic >= 21000) {
        calculatedAmount = grossEsic * 1.75 / 100
    }
    expect(calculatedAmount).toBe(1595.5975);
});


test("IT Case-3", () => {
    let calculatedAmount = 0;

    if (grossYearly > 1000000) {
        calculatedAmount = Math.round(grossYearly * 30 / 100);
    } else if (grossYearly > 500000 && grossYearly < 100000) {
        calculatedAmount = Math.round(grossYearly * 20 / 100);
    } else if (grossYearly > 250000 && grossYearly < 50000) {
        calculatedAmount = Math.round(grossYearly * 5 / 100);
    } else if (grossYearly < 250000) {
        calculatedAmount = 0;
    }

    expect(calculatedAmount).toBe(328237);
});

test("PT Case-4", () => {
    let calculatedAmount = 0

    if (grossPt >= 25001 && grossPt <= 41666) {
        calculatedAmount = 100
    }
    if (grossPt >= 41667 && grossPt <= 66666) {
        calculatedAmount = 150
    }
    if (grossPt >= 66667 && grossPt <= 83333) {
        calculatedAmount = 175
    }
    if (grossPt >= 83334) {
        calculatedAmount = 200
    }
    expect(calculatedAmount).toBe(200);
})


