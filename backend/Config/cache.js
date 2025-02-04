import NodeCache from "node-cache";

// Create a cache instance (stdTTL: time-to-live in seconds)
const cache = new NodeCache({ stdTTL: 300, checkperiod: 120 });

export default cache;
