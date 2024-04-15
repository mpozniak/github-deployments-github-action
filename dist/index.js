/******/ var __webpack_modules__ = ({

/***/ 687:
/***/ ((__webpack_module__, __unused_webpack___webpack_exports__, __nccwpck_require__) => {

__nccwpck_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
const core = require('@actions/core');
const Octokit = require('octokit');
// https://github.com/octokit/core.js#readme

try {
    const owner = core.getInput('repo-owner');
    const repo = core.getInput('repo');
    const ref = core.getInput('ref');
    const githubToken = core.getInput('github-token');
    const autoMerge = core.getInput('auto_merge');
    const payload = core.getInput('payload');
    const task = core.getInput('task');
    const setState = core.getInput('set-state');
    const state = core.getInput('state');
    const description = core.getInput('description');
    const environment = core.getInput('environment');
    const deploymentID = core.getInput('deployment_id');
} catch (error) {
    core.setFailed(error.message);
    console.error(error.message);
}

const octokit = new Octokit({
    auth: githubToken
});

if (setState && state !== '' && deploymentID !== '' && owner !== '' && repo !== '' && ref !== '' && environment !== '') {
    try {
        const setDeploymentStatus = await octokit.request('POST /repos/{owner}/{repo}/deployments/{deployment_id}/statuses', {
            owner: owner,
            repo: repo,
            deployment_id: deploymentID,
            environment: environment,
            state: state,
            description: description,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        if (setDeploymentStatus && setDeploymentStatus.status && setDeploymentStatus.status == 201) {
            if (setDeploymentStatus.data && setDeploymentStatus.data.state) {
                core.setOutput('deployment_id', deploymentID);
                core.setOutput("state", setDeploymentStatus.data.state);
                core.setOutput("status", setDeploymentStatus.status);
                core.info(`Deployment URL:\t${setDeploymentStatus.data.deployment_url}\n
                           State:\t${setDeploymentStatus.data.state}\n
                           Environment:\t${setDeploymentStatus.data.environment}\n
                           Statuses URL:\t${setDeploymentStatus.data.url}\n
                           Repo URL:\t${setDeploymentStatus.data.repository_url}`);
            }
        }
        if (setDeploymentStatus && setDeploymentStatus.status && setDeploymentStatus.status == 422) {
            core.error(`Setting Deployment state error:\n${setDeploymentStatus.data}`);
            core.setFailed(setDeploymentStatus.data);
        }
    } catch (setDeploymentStatusError) {
        core.setFailed(setDeploymentStatusError.message);
        console.error(setDeploymentStatusError.message);
    }
} else {
    try {
        if (owner !== '' && repo !== '' && ref !== '' && environment !== '') {
            const newDeployment = await octokit.request('POST /repos/{owner}/{repo}/deployments', {
                owner: owner,
                repo: repo,
                ref: ref,
                environment: environment,
                auto_merge: autoMerge,
                payload: payload,
                description: description,
                task: task,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });
            if (newDeployment.status && newDeployment.status === 201) {
                if (newDeployment.data && newDeployment.data.id) {
                    core.setOutput('deployment_id', newDeployment.data.id);
                    core.setOutput("state", 'Created');
                    core.setOutput("status", newDeployment.status);
                    core.info(`Deployment URL:\t${newDeployment.data.url}\n
                               Task:\t${newDeployment.data.task}\n
                               Environment:\t${newDeployment.data.environment}\n
                               Original Environment:\t${newDeployment.data.original_environment}
                               Statuses URL:\t${newDeployment.data.statuses_url}\n
                               Repo URL:\t${newDeployment.data.repository_url}`);
                }
            }
            if (newDeployment && newDeployment.status && newDeployment.status == 422) {
                core.error(`Setting Deployment state error:\n${newDeployment.data}`);
                core.setFailed(newDeployment.data);
            }
        }
    } catch (createDeploymentError) {
        core.setFailed(createDeploymentError.message);
        console.error(createDeploymentError.message);
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __nccwpck_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	var threw = true;
/******/ 	try {
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 		threw = false;
/******/ 	} finally {
/******/ 		if(threw) delete __webpack_module_cache__[moduleId];
/******/ 	}
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/async module */
/******/ (() => {
/******/ 	var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 	var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 	var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 	var resolveQueue = (queue) => {
/******/ 		if(queue && !queue.d) {
/******/ 			queue.d = 1;
/******/ 			queue.forEach((fn) => (fn.r--));
/******/ 			queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 		}
/******/ 	}
/******/ 	var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 		if(dep !== null && typeof dep === "object") {
/******/ 			if(dep[webpackQueues]) return dep;
/******/ 			if(dep.then) {
/******/ 				var queue = [];
/******/ 				queue.d = 0;
/******/ 				dep.then((r) => {
/******/ 					obj[webpackExports] = r;
/******/ 					resolveQueue(queue);
/******/ 				}, (e) => {
/******/ 					obj[webpackError] = e;
/******/ 					resolveQueue(queue);
/******/ 				});
/******/ 				var obj = {};
/******/ 				obj[webpackQueues] = (fn) => (fn(queue));
/******/ 				return obj;
/******/ 			}
/******/ 		}
/******/ 		var ret = {};
/******/ 		ret[webpackQueues] = x => {};
/******/ 		ret[webpackExports] = dep;
/******/ 		return ret;
/******/ 	}));
/******/ 	__nccwpck_require__.a = (module, body, hasAwait) => {
/******/ 		var queue;
/******/ 		hasAwait && ((queue = []).d = 1);
/******/ 		var depQueues = new Set();
/******/ 		var exports = module.exports;
/******/ 		var currentDeps;
/******/ 		var outerResolve;
/******/ 		var reject;
/******/ 		var promise = new Promise((resolve, rej) => {
/******/ 			reject = rej;
/******/ 			outerResolve = resolve;
/******/ 		});
/******/ 		promise[webpackExports] = exports;
/******/ 		promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 		module.exports = promise;
/******/ 		body((deps) => {
/******/ 			currentDeps = wrapDeps(deps);
/******/ 			var fn;
/******/ 			var getResult = () => (currentDeps.map((d) => {
/******/ 				if(d[webpackError]) throw d[webpackError];
/******/ 				return d[webpackExports];
/******/ 			}))
/******/ 			var promise = new Promise((resolve) => {
/******/ 				fn = () => (resolve(getResult));
/******/ 				fn.r = 0;
/******/ 				var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 				currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 			});
/******/ 			return fn.r ? promise : getResult();
/******/ 		}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 		queue && (queue.d = 0);
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/compat */
/******/ 
/******/ if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = new URL('.', import.meta.url).pathname.slice(import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
/******/ 
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module used 'module' so it can't be inlined
/******/ var __webpack_exports__ = __nccwpck_require__(687);
/******/ __webpack_exports__ = await __webpack_exports__;
/******/ 
