"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const privateToken_1 = require("./middleware/privateToken");
const router_1 = require("./routes/router");
dotenv_1.default.config({ path: '.env.local' });
function main() {
    try {
        const app = express_1.default();
        // Set various HTTP headers to make the application little more secure (https://www.npmjs.com/package/helmet)
        app.use(helmet_1.default());
        app.use(helmet_1.default.contentSecurityPolicy({
            directives: {
                ...helmet_1.default.contentSecurityPolicy.getDefaultDirectives()
            }
        }));
        // We are making this path publically available
        // We can now for example go here to see an image inside uploads/images:
        // http://localhost:4400/uploads/images/2021-05-02T17:13:00.379Z_Screenshot_20210413_155657_se.bankgirot.swish.jpg
        app.use('/uploads/images', express_1.default.static('uploads/images'));
        if (process.env.NODE_ENV === 'development') {
            app.use(morgan_1.default('dev'));
        }
        // Check if the private token is there
        app.use(privateToken_1.checkPrivateToken);
        // Register routes.
        app.use('/', router_1.router);
        // Starts the HTTP server listening for connections.
        app.listen(process.env.PORT, () => {
            console.log(chalk_1.default.hex('#897DDC')(`Server running in ${process.env.NODE_ENV} mode at http://localhost:${process.env.PORT}`));
            console.log('Press Ctrl-C to terminate...');
        });
    }
    catch (error) {
        console.error(error);
    }
}
main();
