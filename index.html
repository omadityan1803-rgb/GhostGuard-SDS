const { extractFeatures } = require('./src/features');
const { XGBoostLite, DecisionEngine } = require('./src/model');

// --- SIMULATION LOGIC ---
console.log('--- PASSIVESHIELD SIMULATION ---');

const runSimulation = (type) => {
    const state = { mouseSpeeds: [], mouseAccels: [], mousePositions: [], keyTimes: [], scrollDeltas: [], interactions: 85 };
    
    if (type === 'HUMAN') {
        for (let i = 0; i < 50; i++) state.mouseSpeeds.push(400 + Math.random() * 600);
        for (let i = 0; i < 20; i++) state.keyTimes.push(i * (100 + Math.random() * 200));
    } else {
        for (let i = 0; i < 50; i++) state.mouseSpeeds.push(1500);
        for (let i = 0; i < 20; i++) state.keyTimes.push(i * 20);
    }

    const feats = extractFeatures(state);
    const prob = XGBoostLite.predict(feats);
    const result = DecisionEngine.classify(prob);
    
    console.log(`\nScenario: ${type}`);
    console.log(`Human Prob: ${(prob * 100).toFixed(1)}% | Verdict: ${result.verdict}`);
};

runSimulation('HUMAN');
runSimulation('BOT');
