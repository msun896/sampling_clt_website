var runCount = 0, stopCount = 0, stopFreq = 10,  runID, stepID;
var runButton, stepButton, stopSelect;

const charts = {};
const state = {
    sampleMeans: [],
    sampleVariances: []
};
        // generate our data for certain distribution
        function generateData(type, size) {
            let data = [];
            let myDist;
            switch(type) {
                case "normal":
                    myDist = new NormalDistribution(0, 1); // mean = 0, std dev = 1
                    break;
                case "uniform":
                    myDist = new UniformDistribution(0, 1); // start = 0, width = 1
                    break;
                case "exponential":
                    myDist = new ExponentialDistribution(1, 0); // mean = 1, variance = 1
                    break;
                case "benfordDigit":
                    myDist = new BenfordDigitDistribution(10); // default val of 10.
                    break;
                case "arcsine":
                    myDist = new ArcsineDistribution(0, 1); //default to 0 and 1
                    break;
                case "benfordDigit":
                    myDist = new BenfordDigitDistribution(10); // default to 10
                    break;
                case "benfordMantissa":
                    myDist = new BenfordMantissaDistribution(10); // default to 10
                    break;
                case "bernoulli":
                    myDist = new BernoulliDistribution(0.5); // default is 0.5 for coin toss
                    break;
                case "beta":
                    myDist = new BetaDistribution(1, 1); // defaault vals of 1, 1
                    break;
                case "betaPrime":
                    myDist = new BetaPrimeDistribution(1, 1); // defaault vals of 1, 1
                    break;
                case "betaBinomial":
                    myDist = new BetaBinomialDistribution(1, 1, 1); // default vals of 1 1 1
                    break;
                case "betaNegativeBinomial":
                    myDist = new BetaNegativeBinomialDistribution(1, 1, 1);// default vals of 1 1 1
                    break;
                case "birthday":
                    myDist = new BirthdayDistribution(10, 5); // default vals of 10 and 5
                    break;
                case "binomial":
                    myDist = new BinomialDistribution(1, 0.5); //default vals of 1 and 0.5
                    break;
                case "cauchy":
                    myDist = new CauchyDistribution(0, 1); // default vals of 0, 1
                    break;
                case "chiSquare":
                    myDist = new ChiSquareDistribution(1); // default val of 1
                    break;
                case "convolution":
                    myDist = new Convolution(new UniformDistribution(0, 1), 1); // default distribution and 1
                    break;
                case "coupon":
                    myDist = new CouponDistribution(10, 5); // default value of 10 and 5
                    break;
                case "discreteUniform":
                    myDist = new DiscreteUniformDistribution(1, 1); // default val of 1 and 1 
                    break;
                case "discreteArcsine":
                    myDist = new DiscreteArcsineDistribution(2); // default val of 2 
                    break;
                case "extremeValue":
                    myDist = new ExtremeValueDistribution(0, 1); // default vals of 0 and 1
                    break;
                case "exponentialLogarithmic":
                    myDist = new ExponentialLogarithmicDistribution(0.5, 1); // default vals of 0.5 and 1
                    break;
                case "fDistribution":
                    myDist = new FDistribution(1, 1); // default vals of 1 and 1 
                    break;
                case "finiteOrderStatistic":
                    myDist = new FiniteOrderStatistic(10, 5, 1); // default vals of 10, 5, and 1
                    break;
                case "foldedNormal":
                    myDist = new FoldedNormalDistribution(0, 1); // default vals of 0 and 1
                    break;
                case "gamma":
                    myDist = new GammaDistribution(1, 1); //  default values of 1 and 1
                    break;
                case "geometric":
                    myDist = new GeometricDistribution(0.5); // default val of 0.5
                    break;
                case "halfNormal":
                    myDist = new HalfNormalDistribution(1); // default val of 1
                    break;
                case "hyperbolicSecant":
                    myDist = new HyperbolicSecantDistribution(0 , 1); // default vals of 0 & 1
                    break;
                case "hypergeometric":
                    myDist = new HypergeometricDistribution(10, 5, 5); // default vals of 10 5 5 
                    break;
                case "irwinHall":
                    myDist = new IrwinHallDistribution(1); // default val of 1
                    break;
                case "laplace":
                    myDist = new LaplaceDistribution(0, 1); // 0 and 1 default
                    break;
                case "locationScale":
                    myDist = new LocationScaleDistribution(new NormalDistribution(0, 1), 0, 1); // default vals of a normal dist and 0&1
                    break;
                case "logLogistic":
                    myDist = new LogLogisticDistribution(1, 1); // default vals of 1 and 1
                    break;
                case "logarithmic":
                    myDist = new LogarithmicDistribution(0.5); //  default vals of 0.5 
                    break;
                case "logNormal":
                    myDist = new LogNormalDistribution(0, 1); // default vals of 0 and 1
                    break;
                case "match":
                    myDist = new MatchDistribution(10); // 10 is default
                    break;
                case "maxwellBoltzmann":
                    myDist = new MaxwellBoltzmannDistribution(1); // 1 is default
                    break;
                case "negativeBinomial":
                    myDist = new NegativeBinomialDistribution(1, 0.5); // 1 and 0.5 are default
                    break;
                case "orderStatistic":
                    myDist = new OrderStatistic(new UniformDistribution(0, 1), 1, 1); // uniformdist 1 and 1 are default vals
                    break;
                case "pareto":
                    myDist = new ParetoDistribution(1, 1); // 1 and 1 are default
                    break;
                case "polya":
                    myDist = new PolyaDistribution(10, 10, 0, 5); // default vals of 10 10 0 5
                    break;
                case "poisson":
                    myDist = new PoissonDistribution(1); // default of 1
                    break;
                case "semiCircle":
                    myDist = new SemiCircleDistribution(0, 1); // default of 0 and 1
                    break;
                case "student":
                    myDist = new StudentDistribution(1); // default val 1
                    break;
                case "triangle":
                    myDist = new TriangleDistribution(0, 1, 0.5); // default of 0, 1, 0.5
                    break;
                case "uQuadratic":
                    myDist = new UQuadraticDistribution(0, 1); // default of 0 and 1
                    break;
                case "walkMax":
                    myDist = new WalkMaxDistribution(10); // 10 is default
                    break;
                case "walkPosition":
                    myDist = new WalkPositionDistribution(10, 0.5); // default 10 and 0.5
                    break;
                case "weibull":
                    myDist = new WeibullDistribution(1, 1); //default of 1 and 1
                    break;
                case "zeta":
                    myDist = new ZetaDistribution(2); // default of val 2
                    break;
                default:
                    throw new Error("Unknown distribution type: " + type);
            }
            for (let i = 0; i < size; i++) {
                data.push(myDist.simulate());
            }
            return data;
        }

        function binData(data, binCount = 32) {
            let min = Math.min(...data); // spread array
            let max = Math.max(...data);
            if (min === max) { min -= 0.5; max += 0.5; }
            const binWidth = (max - min) / binCount;
        
            // Set up bins and labels
            const bins = Array(binCount).fill(0);
            const labels = [];
        
            for (let i = 0; i < binCount; i++) {
                labels.push((min + i * binWidth).toFixed(2));
            }
        
            // Count data into bins
            data.forEach(value => {
                let index = Math.floor((value - min) / binWidth);
                if (index >= binCount) index = binCount - 1; // edge case for max value
                bins[index]++;
            });

            return { labels, bins };
        }

        function renderChart(canvasId, data, title) {
            
            const { labels, bins } = binData(data); // bin the raw data
            let ctx = document.getElementById(canvasId).getContext("2d");
            
            if (charts[canvasId]) { // will reset the charts so they can redisplay
                charts[canvasId].destroy();
            }

            if(canvasId == "NativeChart") {
                charts[canvasId] = new Chart(ctx, {
                    type: "line",
                    data: {
                        labels: labels,
                        datasets: [{
                            label: title,
                            data: bins,
                            backgroundColor: "rgba(0, 123, 255, 0.2)",
                            borderColor: "rgba(0, 123, 255, 1)",
                            borderWidth: 2,
                            fill: true,
                            tension: 0.4, // This creates smooth curves between points
                            pointRadius: 3,
                            pointHoverRadius: 5
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: { beginAtZero: true }
                        },
                        plugins: {
                            tooltip: {
                                enabled: true
                            },
                            datalabels: false // Disable if you have the datalabels plugin
                        },
                    }
                });
            }
            else {
                charts[canvasId] = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [{ label: title, data: bins, backgroundColor: "rgba(0, 123, 255, 0.5)" }]
                },
                options: { responsive: true, scales: { y: { beginAtZero: true } } }
            });
            }
        }

        function addStatsRow(TableID, values) {
            const table = document.getElementById(TableID);

            // wipe previous data rows (keep the header)
            while (table.rows.length > 1) table.deleteRow(1);
            
            const n = values.length;
            const mean = values.reduce((s,x)=>s+x,0) / n;
            const sorted = [...values].sort((a,b)=>a-b);
            const range = sorted[n - 1] - sorted[0];
            const median = n % 2 ? sorted[(n-1)/2]
                                : 0.5*(sorted[n/2-1] + sorted[n/2]);

            const diffs = values.map(v => v - mean);
            const sumSq = diffs.reduce((s, d) => s + d * d, 0);
            const variance = diffs.reduce((s,d)=>s+d*d,0) / (n - 1);
            const varianceU  = n > 1 ? sumSq / (n - 1) : NaN;
            const sd = Math.sqrt(variance);
        
            const m3 = diffs.reduce((s,d)=>s + d**3, 0) / n;
            const m4 = diffs.reduce((s,d)=>s + d**4, 0) / n;
            const skew = m3 / Math.pow(sd, 3);
            const kurt = m4 / Math.pow(sd, 4); // (not excess)

            const absDevs = values.map(v => Math.abs(v - median)).sort((a, b) => a - b);
            const mad = n % 2 ? absDevs[(n - 1) / 2]
                    : 0.5 * (absDevs[n / 2 - 1] + absDevs[n / 2]);

            const row = table.insertRow(-1);
            [n, mean, median, sd, skew, kurt].forEach(v => {
                const td = row.insertCell();
                td.textContent = typeof v === "number" ? v.toFixed(6) : v;
                td.className = "stat-cell";
            });

            if (TableID === "sampleTable") {
                
                const selectId = "metricOne";
                const stateKey = "sampleMeans";
                const metric = document.getElementById(selectId).value;

                const selectIdTwo = "metricTwo";
                const stateKeyTwo = "sampleVariances";
                const metricTwo = document.getElementById(selectIdTwo).value;
                // Map metric -> value you computed above
                chosen = {
                    mean,           // average
                    median,
                    sd,             // from varianceU or ML—your call
                    variance, // divide by n
                    varianceU,      // divide by n-1
                    mad,
                    range
                }[metric];
                chosenTwo = {
                    mean,           // average
                    median,
                    sd,             // from varianceU or ML—your call
                    variance, // divide by n
                    varianceU,      // divide by n-1
                    mad,
                    range
                }[metricTwo];

                state[stateKey].push(chosen);
                state[stateKeyTwo].push(chosenTwo);

                // state.sampleMeans.push(mean); 
                // state.sampleVariances.push(variance);
                }
                
        }
        
        function updateNative(NativeData) {
            // updates the Native Distribution Chart
            renderChart("NativeChart", NativeData, "Native Distribution");
            addStatsRow("NativeTable", NativeData);
        }
        function updateSample(sampleData) {
            renderChart("sampleChart", sampleData, "Sample Distribution");
            addStatsRow("sampleTable", sampleData);
        }
        function updateStatsOne(sampleDataOne) {
            renderChart("sampleMeansChart", sampleDataOne, "Sampling Distribution One");
            addStatsRow("sampleMeansTable", sampleDataOne);
        }
        function updateStatsTwo(sampleDataTwo) {
            renderChart("sampleVariancesChart", sampleDataTwo, "Sampling Distribution Two");
            addStatsRow("sampleVariancesTable", sampleDataTwo);
        }

        function runSample() {
            let distType = document.getElementById("distribution").value;
            let sampleSizeOne = parseInt(document.getElementById("sampleSizeOne").value, 10);
            let sampleSizeTwo = parseInt(document.getElementById("sampleSizeTwo").value, 10);

            let NativeData = generateData(distType, 100000); // correct
            let sampleDataOne = generateData(distType, sampleSizeOne); 
            let sampleDataTwo = generateData(distType, sampleSizeTwo); 

            updateNative(NativeData);
            updateSample(sampleDataOne);
            updateStatsOne(state.sampleMeans);
            updateStatsTwo(state.sampleVariances);

        }

        function runExperiment() {
            for(let i = 0; i < document.getElementById("runSize").value; i++){
                runSample();
            }
        }