const { Router } = require('express')

const { ERRORS } = require("./error_handler")
const { ErrorHandler } = require("./error_handler")

const RESTRouter = function(name, model){
    const router = Router();

    router.post(name, async(req, res) => {
        try{
            const newData = await model.create({ ...req.body });

            if(!newData){
                var error = new Error();
                error.name = "NullError";
                throw error;
            }

            res.status(201).json({ status: true, data: newData });
        } catch(err){
            let code = ErrorHandler(err.name);
            
            res.status(code).json({success: false, messages: [ERRORS[code]]});
        }
    })

    router.get(name, async(req, res) => {
        try{
            let query = {...req.query}
            delete query["limit"];  //delete every query that's not part of the database model
    
            const limit = Number(req.query.limit) || 100;
            const data = await model.find(query).limit(limit);
            
            res.status(200).json({success: true, data: data });
        }catch(err){
            let code = ErrorHandler(err.name);
            
            res.status(code).json({success: false, messages: [ERRORS[code]]});
        }
    })

    router.get(name + ":id", async(req, res) => {
        try{
            const data = await model.findById(req.params.id);

            if(!data){
                var error = new Error();
                error.name = "NullError";
                throw error;
            }

            res.status(200).json({success: true, data: data});
        } catch(err){
            let code = ErrorHandler(err.name);
            
            res.status(code).json({success: false, messages: [ERRORS[code]]});
        }
    })

    router.delete(name + ":id", async(req, res) => {
        try{
            const data = await model.findByIdAndRemove({_id: req.params.id});
            
            if(!data) {
                var error = new Error();
                error.name = "NullError";
                throw error;
            }

            res.status(200).json({success: true, data: null});
        } catch(err){
            let code = ErrorHandler(err.name);
            
            res.status(code).json({success: false, messages: [ERRORS[code]]});
        }
    })

    router.put(name + ":id", async(req, res) => {
        try{
            const data = await model.findOneAndUpdate(
                {_id: req.params.id},
                { ...req.body},
                {new: true});
    
            if(!data){
                var error = new Error();
                error.name = "NullError";
                throw error;
            }

            //WHERE TO PUT REQ BODY VALIDATORS?

            res.status(200).json({ success: true, data: data })
        } catch(err){
            let code = ErrorHandler(err.name);
            
            res.status(code).json({success: false, messages: [ERRORS[code]]});
        }
    })

    return router;
}

module.exports = { RESTRouter };