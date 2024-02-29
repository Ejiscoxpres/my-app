"use node";


import { Id } from './_generated/dataModel';
import { internalAction, internalMutation, mutation, query } from './_generated/server';
import Replicate from "replicate";


export const generate = internalAction(
    async(
        {
            runMutation
        }, 
        {   prompt, 
            image,
            sketchId}: 
        {sketchId: Id<string>; prompt: string; image: string}) => {

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!,
});

console.log("running replicate");


const output = (await replicate.run(
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
)) as [string, string];

await runMutation("sketches:updateSketchResult", {
    sketchId,
    result: output[1],
  });

    console.log('hello world', {sketchId, prompt, image  });
    
}
);
