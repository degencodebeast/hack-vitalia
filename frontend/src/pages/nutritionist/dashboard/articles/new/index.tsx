import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Stack,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import NutritionistDashboardLayout from '../../layout';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import ReactMde from 'react-mde';

import 'react-mde/lib/styles/css/react-mde-all.css';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import DragAndDropImage from '@/components/DragAndDropImage';

import { generateSlug } from '@/utils';

import { useRouter } from 'next/router';
import { NewArticle, PostStatus } from '@/types/shared';
import { useAddArticleMutation } from '@/state/services';
import { shortenText } from '@/helpers';

export default function NewPostPage() {
  const [addArticle, { isLoading, status, isSuccess, isError, data }] =
    useAddArticleMutation();
  console.log({ status }, 'NewPostPage');

  const router = useRouter();
  const toast = useToast({
    duration: 3000,
    position: 'top',
    status: 'success',
    title: ' Successful',
  });
  const [imageFile, setImageFile] = useState<string>();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [contentValue, setContentValue] = useState('');
  const [post, setPost] = useState<NewArticle>({
    title: '',
    slug: '',
    content: '',
    intro: '',
    image: '',
    status: 'draft',
    authorId: 2,
  });

  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write');
  const onImageChangeHandler = useCallback(
    (hasImage: boolean, files: File[], image: string) => {
      if (hasImage) {
        console.log({ hasImage, files, image: shortenText(image) });
        // setPost((prev) => ({ ...prev, image: image }));
        setImageFile(image);
        // const reader = new FileReader();

        //         reader.onload = function (e) {
        //           const base64String = e.target?.result as string;

        //           setPost((prev) => ({ ...prev, image: base64String }));
        //         };
        //         reader.readAsDataURL(files[0]);
      }
    },
    []
  );
  function saveAsDraft() {
    try {
      const postToSave = {
        ...post,
        slug: generateSlug(post.title),
        image: imageFile,
      };
      // if (imageFile) {
      //   const reader = new FileReader();

      //   reader.onload = function (e) {
      //     const base64String = e.target?.result as string;
      //     postToSave.image = base64String;
      //   };
      //   reader.readAsDataURL(imageFile);
      // }
      console.log({ postToSave });

      console.log({ status }, 'Success draft saved');

      if (submitted) {
        resetFields();
        toast({ title: data?.message });
        setTimeout(() => {
          router.replace('/nutritionist/dashboard/articles');
        }, 2000);
      }
      addArticle(postToSave);
    } catch (error) {
      toast({ title: 'An error occurred, please try again', status: 'error' });
    }
  }
  function saveAsPublished() {
    try {
      const postToSave = {
        ...post,
        status: 'published' as PostStatus,
        slug: generateSlug(post.title),
        image: imageFile,
      };
      // if (imageFile) {
      //   const reader = new FileReader();

      //   reader.onload = function (e) {
      //     const base64String = e.target?.result as string;
      //     postToSave.image = base64String;
      //   };

      //   reader.readAsDataURL(imageFile);
      // }
      console.log({ status, postToSave }, 'Success published saved');

      if (submitted) {
        resetFields();
        toast({ title: data?.message });
        setTimeout(() => {
          router.replace('/nutritionist/dashboard/articles');
        }, 2000);
      }
      addArticle(postToSave);
    } catch (error) {
      toast({ title: 'An error occurred, please try again', status: 'error' });
    }
  }
  function handleEditorChange(value: string): void {
    setContentValue(value);
    setPost((prev) => ({ ...prev, content: value }));
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const { name, value } = event.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  }
  function resetFields(): void {
    setPost({
      title: '',
      slug: '',
      content: '',
      intro: '',
      image: '',
      status: 'draft',
      authorId: 2,
    });
    setContentValue('');
    setImageFile(undefined);
  }

  useEffect(() => {
    if (status === 'fulfilled') {
      setSubmitted(true);
    }
  }, [status, isSuccess]);
  return (
    <>
      <NutritionistDashboardLayout>
        <Box px={4} my={5}>
          <Box bg={'white'} rounded={'14px'}>
            <Flex
              pos={'sticky'}
              top={0}
              zIndex={10}
              bg={'white'}
              justifyContent={'flex-end'}
              py={3}
              my={4}
              px={4}
              borderBottom={'1px'}
              borderColor={'blackTrans-15'}
            >
              {' '}
              <HStack gap={4}>
                <Button
                  isLoading={isLoading}
                  onClick={saveAsPublished}
                  rounded={'full'}
                  px={6}
                  size='md'
                >
                  Publish{' '}
                </Button>{' '}
                <Button
                  isLoading={isLoading}
                  onClick={saveAsDraft}
                  rounded={'full'}
                  variant={'outline'}
                >
                  Save as draft
                </Button>
              </HStack>
            </Flex>
            <Stack px={4} py={6} gap={3}>
              <DragAndDropImage
                onUploadChange={(hasImage, files, image) =>
                  onImageChangeHandler(hasImage, files, image)
                }
              />{' '}
              <Input
                name='title'
                value={post.title}
                onChange={handleInputChange}
                h={'auto'}
                py={2}
                placeholder='Post Title...'
                fontSize={'x-large'}
                fontWeight={'medium'}
              />
              <Textarea
                name='intro'
                value={post.intro}
                onChange={handleInputChange}
                my={4}
                maxH={'200px'}
                placeholder='A short introduction for the post...'
              ></Textarea>
              <Box py={4}>
                <ReactMde
                  value={contentValue}
                  onChange={(value: string) => handleEditorChange(value)}
                  selectedTab={selectedTab}
                  onTabChange={setSelectedTab}
                  generateMarkdownPreview={(markdown: string) =>
                    Promise.resolve(<MarkdownRenderer markdown={markdown} />)
                  }
                />
              </Box>
              <Box></Box>
            </Stack>
          </Box>
        </Box>
      </NutritionistDashboardLayout>
    </>
  );
}
