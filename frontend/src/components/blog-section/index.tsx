
import { Box, Flex, HStack, Heading, LinkBox,Stack, Text,Image,Skeleton, LinkOverlay } from "@chakra-ui/react"
import NextLink from 'next/link'
import Article from "../article"

const BlogSection = () => {
    const articles=[{id:'1',slug:'article-1', title:'Fitness Recipes: Healthy Food for any workout',intro:'',content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto qui saepe rerum pariatur nemo facilis quam incidunt laudantium iure officia. Itaque impedit iste nemo facere, temporibus ab quasi qui quas!',image:'/images/fruit.jpg'
    },{id:'2',slug:'article-2',
        title:'This may be the untold secret to longetivity',intro:'',content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto qui saepe rerum pariatur nemo facilis quam incidunt laudantium iure officia. Itaque impedit iste nemo facere, temporibus ab quasi qui quas!',image:'/images/fruit.jpg'
    },{id:'3',slug:'article-3',
        title:'Walking leads to longer life, better outcomes.',intro:'',content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto qui saepe rerum pariatur nemo facilis quam incidunt laudantium iure officia. Itaque impedit iste nemo facere, temporibus ab quasi qui quas!',image:'/images/fruit.jpg'
    }]
  return (
    <Box as="section" my={12}>
        <Heading textTransform={'uppercase'} color={'primaryColor.800'} size={'2xl'} my={6} textAlign={'center'}>Our Blog</Heading>
<HStack wrap={'wrap'} gap={4} maxW={'1100px'} mx={'auto'} my={6} py={4} px={{base:3,lg:0}}>

    {articles.length && articles.map((article)=><Article key={article?.id} article={article}/>)} 

</HStack>
    </Box>
  )
}

export default BlogSection