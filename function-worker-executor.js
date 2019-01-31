const FunctionWorkerExecutor = {

    /**
     * Execute the specified function in a web worker
     * 
     * The function (fn) *must* return a Promise and resolve it to indicate completion.
     * (If data needs to be returned, it should be specified when calling Promise.resolve)
     * 
     * The Promise returned by this method will resolve when: 
     *     (1) fn resolves
     *     (2) message indicating completion is recived from the spawned worker
     * 
     * @param {Function} fn 
     * @param {Object} param 
     * @returns {Promise}
     */
    execute: function(fn, param) {

        return new Promise(resolve => {

            var paramStr = ``;
            if(param) {
                paramStr = JSON.stringify(param);
            }

            const fnString = `
                ((${fn.toString()})(${paramStr})).then(function(r) { postMessage(r); });
            `;

            const workerFuncUrl = URL.createObjectURL(new Blob([ fnString ]));
            const worker = new Worker(workerFuncUrl);

            worker.onmessage = function(msg) {
                resolve(msg.data);
            };

        });
    }

};

