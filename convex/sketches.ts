
import { Id } from './_generated/dataModel';
import { internalAction, internalMutation, mutation, query } from './_generated/server';
import Replicate from "replicate";

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

export const generate = internalAction(
    async(
        {
            runMutation
        }, 
        {   prompt, 
            image,
            sketchId}: 
        {sketchId:string; prompt: string; image: string}) => {

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!,
});

const output = await replicate.run(
  "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
  {
    input: {
        image,
        prompt,
        scale:7,
        image_resolution:'523',
        n_prompt:
        "bad anatomy, bad hands, lowres, longbody, extra digits, missing fingers, cropped, worst quality, low quality,fewer digits"
    }
  }
);

runMutation(sketches:updateSketchResult, {
    sketchId,
    results: output[1]
})
    console.log('hello world', {sketchId, prompt, image  });
    
}
);

export const updateSketchResult = internalMutation(({db}, {sketchid, result}: {sketchId: Id<string>; result:string}) => {
    await db.patch(sketchid, {
        result,
    })

})

export const getSketches = query(async ({db}) => {
    const sketches = await db.query("sketches").collect();
    return sketches;
});