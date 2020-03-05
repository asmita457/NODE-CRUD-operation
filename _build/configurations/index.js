"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nconf = require("nconf");
const path = require("path");
//Read Configurations
const configs = new nconf.Provider({
    env: true,
    argv: true,
    store: {
        type: 'file',
        file: path.join(__dirname, `./config.${process.env.NODE_ENV || "dev"}.json`)
    }
});
// Return All configurations
function getConfigurations() {
    return configs.get("configurations");
}
exports.getConfigurations = getConfigurations;
//# sourceMappingURL=index.js.map