import { mutation } from './_generated/server';

export const saveSketch = mutation(
     async ({ db }, { prompt}: {prompt: string }) => {
        await db.insert("sketches",{
            prompt,
           
        })
    
    
    return{
        message:'success',
    }
});