'use client';

import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { useForm } from 'react-hook-form';

export default function Home() {
  const saveSketchMutation = useMutation(api.sketches.saveSketch);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } =  useForm<{
    prompt: string;
  }>();

  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={handleSubmit((formData) => {
          console.log(formData);
          saveSketchMutation(formData);
      })}
      >
      <input className='text-black'
      {...register("prompt", { required: true })} />
      {errors.prompt && <span>This field is required</span>}
      

      <input type="submit" />
    </form>
    </main>
  );
}

