
import { internalAction, mutation, query } from './_generated/server';

export const saveSketch = mutation(
     async ({ db }, { prompt, image}: {prompt: string, image: any }) => {
       const sketch = await db.insert("sketches",{
            prompt,
           
        })

        await scheduler.runAfter(0, sketches:generate, {
            sketchId: sketch.id,
            prompt,
            image,
            
          });
      
    
    
    return{
        message:'success',
    }
}
);

export const generate = internalAction(({}, {prompt, image, sketchId}: {sketchId:string; prompt: string; image: string}) => {
    //implement me
    console.log('hello world', {sketchId, prompt, image  });
    
});

export const getSketches = query(async ({db}) => {
    const sketches = await db.query("sketches").collect();
    return sketches;
});