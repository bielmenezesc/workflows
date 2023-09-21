const express = require('express');
const router = express.Router();
const workflow = require('../models/workflow');

// route to creat a new workflow
router.post('/workflows', async (req, res) => {
    const { name, initBox, endBox, conditionalBox, actionBox } = req.body;

    try {
        const newWorkflow = new workflow({
            name,
            initBox,
            endBox,
            conditionalBox,
            actionBox
        });

        await newWorkflow.save();

        res.status(201).json(newWorkflow);
    } catch (error) {
        res.status(500).json({error: 'Error on creating the workflow.'});
    }
});

// route to edit a workflow
router.put('/workflows/:id', async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updateWorkflow = await workflow.findByIdAndUpdate(id, updateData, {
            new: true,
        });
        if (!updateWorkflow) {
            return res.status(404).json({error: 'Workflow not found.'});return res.status(404).json({error: 'Workflow not found.'});
        }
        res.status(200).json(updateWorkflow);
    } catch (error) {
        res.status(500).json({ error: 'Error on editing the workflow.' });
    }
});

// route to delete a workflow
router.delete('/workflows/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deleteWorkflow = await workflow.findByIdAndRemove(id);
        if (!deleteWorkflow) {
            return res.status(404).json({error: 'Workflow not found.'});
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error on deleting the workflow.' });
    }
});

// route to show details of a workflow
router.get('/workflow/:id', (req, res) => {
    const { id } = req.params

    try {
        const showWorkflow = await workflow.findById(id);

        if (!showWorkflow) {
            return res.status(404).json({ error: 'Workflow não encontrado.' });
        }
        res.status(200).json(workflow);
    } catch (error) {
        res.status(500).json({ error: 'Error on showing the workflow.' });
    }
})

module.exports = router;