'use client'

import MarkdownRenderer from "@/components/MarkdownRenderer"
import { Article } from "@/types/shared"
import { Box, HStack, Text,Avatar,Heading, Image, Stack, Flex } from "@chakra-ui/react"
import { format } from "date-fns"
import Head from "next/head"
import { useState } from "react"

 const ArticleView =()=>{
    const [article,setArticle]=useState<Article>( {
        id: "1",
        slug: "sample-article",
        title: "Sample Article Title",
        content: "This is the content of the sample article. It can include a lot of information and details.",
        image: "",
        status: "published",
        intro: "A brief introduction to the sample article.",
        createdAt: new Date(),
        updatedAt: new Date(),
        author: {
            name: "John Doe",
            avatar: "author-avatar-url.jpg"
        }
    })
return(

    <>
    <Head>
        <title>{article?.title}</title>
    </Head>
    <Box bg={'secondaryColor.100'}>
<Box bg={'white'} maxW={'1000px'} mx={'auto'} minH={'100vh'} px={{lg:6,base:4}} py={6}>

<HStack my={4}  spacing={'4'} mb={8}>
    <Avatar size={'sm'} src={article?.author?.avatar} />
    <HStack divider={<DotDivider/>}>

     <Text as={'strong'} fontSize={'large'}>{article?.author?.name}</Text> <Text as={'time'} fontWeight={'medium'} fontSize={'sm'} color={'gray.500'} >{format(article?.createdAt,'MMM dd, yyyy')}</Text>
    </HStack>
</HStack>
<Stack spacing={4} mb={6}>

<Box>
    <Heading mb={8} >{article?.title}</Heading >
    {article?.intro && <Text color={'gray.500'} fontWeight={'medium'} mb={2}>{article?.intro}</Text>}
</Box>

<Box >

<Image w={'full'} bg={'gray.100'} alt="" src={article?.image||'/images/placeholder-image.png'} h={'auto'} maxH={{lg:500,base:400}} objectFit={'contain'}/>
</Box>
</Stack>

<Box>
   <MarkdownRenderer markdown={article?.content} />
</Box>
</Box>
    </Box>
    
    </>
)

}

export const DotDivider=()=>{
    return(
        <Flex align={'center'} justify={'center'} px={2}>
            <Box w={1} h={1} rounded={'full'} bg={'gray.300'}>

            </Box>
        </Flex>
    )
}

export default ArticleView