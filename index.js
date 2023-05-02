const core = require('@actions/core');
const github = require('@actions/github');




async function run() {
    try {
        const audience = core.getInput('audience');
        const envVarName = core.getInput('environmentVariableName');
        console.log(`Generating JWT for ${audience} into the environment variable ${envVarName}`);
        const jwt = await core.getIDToken(audience);
        core.setSecret(jwt);
        core.exportVariable(envVarName,jwt);
        
      } catch (error) {
        core.setFailed(error.message);
      }
}


exports.withSleep = function (s) {
sleep = s;
};
exports.reset = function () {
sleep = defaultSleep;
};

exports.run = run

/* istanbul ignore next */
if (require.main === module) {
    run();
}