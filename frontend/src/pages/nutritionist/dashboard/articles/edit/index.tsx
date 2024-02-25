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

import { genID, generateSlug } from '@/utils';

import { useRouter } from 'next/router';
import { Article, NewArticle, PostStatus } from '@/types/shared';
import { useAddArticleMutation, useGetArticleQuery } from '@/state/services';
import { shortenText } from '@/helpers';

export default function NewPostPage() {
  const [
    addArticle,
    {
      isLoading: isMutationLoading,
      status,
      isSuccess,
      isError,
      data: isMutationData,
    },
  ] = useAddArticleMutation();
  const router = useRouter();
  const { pid } = router.query;
  const { data, isLoading, isFetching } = useGetArticleQuery({
    slug: pid as string,
    use_id: true,
  });
  const articleToEdit = data?.data as Article;

  const toast = useToast({
    duration: 3000,
    position: 'top',
    status: 'success',
    title: 'Saved Successful',
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [contentValue, setContentValue] = useState('');
  const [post, setPost] = useState<Partial<Article>>(articleToEdit);
  const [imageFile, setImageFile] = useState<string>(post?.image as string);

  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write');
  const onImageChangeHandler = useCallback(
    (hasImage: boolean, files: File[], image: string) => {
      if (hasImage) {
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
        // slug: generateSlug(post.title),
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

      if (submitted) {
        resetFields();
        toast({ title: isMutationData?.message });
        setTimeout(() => {
          // router.replace('/nutritionist/dashboard/articles');
        }, 2000);
      }
      addArticle(postToSave as Article);
    } catch (error) {
      toast({ title: 'An error occurred, please try again', status: 'error' });
    }
  }
  function saveAsPublished() {
    try {
      const postToSave = {
        ...post,
        status: 'published' as PostStatus,
        // slug: generateSlug(post.title),
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

      if (submitted) {
        resetFields();
        toast({ title: isMutationData?.message });
        setTimeout(() => {
          // router.replace('/nutritionist/dashboard/articles');
        }, 2000);
      }
      addArticle(postToSave as Article);
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
      authorAddress: '0xed65da3exd8fe888dce89834ae',
    });
    setContentValue('');
    setImageFile('');
  }

  useEffect(() => {
    if (status === 'fulfilled') {
      setSubmitted(true);
    }
  }, [status, isSuccess]);
  useEffect(() => {
    setPost(articleToEdit);
    setImageFile(articleToEdit?.image as string);
    setContentValue(articleToEdit?.content as string);
  }, [articleToEdit]);
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
                  isLoading={isMutationLoading}
                  onClick={saveAsPublished}
                  rounded={'full'}
                  px={6}
                  size='md'
                >
                  Publish{' '}
                </Button>{' '}
                <Button
                  isLoading={isMutationLoading}
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
                initialImages={[{ id: genID(), src: post?.image as string }]}
                onUploadChange={(hasImage, files, image) =>
                  onImageChangeHandler(hasImage, files, image)
                }
              />{' '}
              <Input
                name='title'
                value={post?.title}
                onChange={handleInputChange}
                h={'auto'}
                py={2}
                placeholder='Post Title...'
                fontSize={'x-large'}
                fontWeight={'medium'}
              />
              <Textarea
                name='intro'
                value={post?.intro}
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
