const crypto = require('crypto');
const uuid = require('uuid');

module.exports = {
    createTaskMessage(task) {
        const id = uuid.v4();
        
        //const datetime = new Date(Date.now() + 5*1000);
        const datetime = new Date(Date.now());
        const eta = datetime.toISOString();
   
        return {
            id,
            task,
            args: [id],
            eta
        }
    }
}