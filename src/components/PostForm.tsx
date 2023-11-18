import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea.tsx';
import FileUploader from '@/components/shared/FileUploader.tsx';
import { Input } from '@/components/ui/input.tsx';
import { PostValidation } from '@/lib/validation';
import { Models } from 'appwrite';
import {
  useCreatePost,
  useUpdatePost,
} from '@/lib/react-query/quariesAndMutations.ts';
import { useUserContext } from '@/context/AuthContext.tsx';
import { useToast } from '@/components/ui/use-toast';

type PostFormProps = {
  post?: Models.Document;
  action?: 'update' | 'create';
};

const PostForm = ({ post, action }: PostFormProps) => {
  const { mutateAsync: createPost,isPending: isCreating } = useCreatePost();
  const { mutateAsync: updatePost, isPending: isUpdating } = useUpdatePost();
  /*const { mutateAsync: deletePost, isPending: isDeleting } = useDeletePost();*/

  const { user } = useUserContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : '',
      file: [],
      location: post ? post?.location : '',
      tags: post ? post?.tags.join(',') : '',
    },
  });

  async function onSubmit(values: z.infer<typeof PostValidation>) {
    try {
      if (post && action === 'update') {
        const updatedPost = await updatePost({
          ...values,
          postId: post.$id,
          imageId: post?.imageId,
          imageUrl: post?.imageUrl,
        });
        if (!updatedPost) {
          throw new Error('Post update failed');
        }
        return navigate(`/posts/${post.$id}`);
      }

      const newPost = await createPost({
        ...values,
        userId: user.id,
      });
      if (!newPost) {
        throw new Error('Post creation failed');
      }
      return navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: (error as Error).message,
        });
      } else {
        console.error(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-9 w-full max-w-5xl'
      >
        <FormField
          control={form.control}
          name='caption'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Caption</FormLabel>
              <FormControl>
                <Textarea
                  className='shad-textarea custom-scrollbar'
                  {...field}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='file'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='location'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Add Location</FormLabel>
              <FormControl>
                <Input type='text' className='shad-input' {...field}></Input>
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='tags'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>
                Add Tags(separated by coma " , ")
              </FormLabel>
              <FormControl>
                <Input
                  type='text'
                  className='shad-input'
                  placeholder='e.g. travel, nature, food'
                  {...field}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <div className='flex gap-4 items-center justify-end'>
          <Button type='button' className='shad-button_dark_4'>
            Cancel
          </Button>
          <Button
            type='submit'
            className='shad-button_primary whitespace-nowrap'
            disabled={isUpdating || isCreating}
          >
            {(isUpdating || isCreating) && 'Loading...'}
            {action === 'update' ? 'Update' : 'Post'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
