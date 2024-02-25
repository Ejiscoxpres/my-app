'use client';

import { api } from '@/convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';

export default function Home() {
  const saveSketchMutation = useMutation(api.sketches.saveSketch);
  const sketchesQuery = useQuery(api.sketches.getSketches);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } =  useForm<{
    prompt: string;
  }>();

  
  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  const sortedSketches = (sketchesQuery ?? []).sort((a, b) => {
    return b._creationTime - a._creationTime;
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={handleSubmit( async (formData) => {
      
      className="flex flex-col gap-2 w-1/4"
      onsubmit={handleSubmit(async: any (formData) => {
        if (!canvasRef.current) return;
        const image = await canvasRef.current.exportImage("jpeg");
        await saveSketchMutation({ ...FormData, Image });
      })}
      >

      <input className=' text-black'
      {...register("prompt", { required: true })} />
      {errors.prompt && <span>This field is required</span>}
      
      <ReactSketchCanvas
      ref={canvasRef}
      style={{width: 256, height:256}}
      width="600"
      height="400"
      strokeWidth={4}
      strokeColor="black"
    />

      <input type="submit" />
    </form>
    </main>
  )
}

