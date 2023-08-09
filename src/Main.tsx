import Badge from '@mui/material/Badge';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Comment from '@mui/icons-material/Comment'
import CssBaseline  from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Link as PostLink } from 'react-router-dom';
import { useIndexData } from './helpers/hooks';
import { CommentsType } from './helpers/types';


interface postPreviewProps {
  post: {
    _id: string,
    date: string,
    comments: CommentsType,
    content: string,
    title: string
  };
}


const PostPreview = function PostPreview(props: postPreviewProps) {
  const { post } = props;

  const commentsCount = post.comments.length - 1;

  const truncatePostContent = function truncatePostContent(content:string){
    return content.substring(0,350) + '...'
  }

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component={PostLink} to={`/post/${post._id}`}>
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post.date}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {truncatePostContent(post.content)}
            </Typography>
            <Grid sx={{display: 'flex'}} justifyContent="space-between">
              <Link component={PostLink} to={`/post/${post._id}`}>
                <Typography variant="subtitle1" color="primary">
                    Continue reading...
                </Typography>
              </Link>     
              <Badge badgeContent={commentsCount} color="primary">
                <Comment color="primary" titleAccess="CommentsIcon" fontSize='large' />
              </Badge>
            </Grid>    
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}


const Main = function(){

   const { posts } = useIndexData()
    
    return (
        <>
        <CssBaseline />
        <Container maxWidth="lg" sx={{py:4}}>
          <main>
            {
              posts && posts.length > 0 ? (
                <Grid container spacing={4}>
                  {posts.map(
                    function convertToPreview(post){
                      return <PostPreview key={post.title} post={post} />
                  })}
                </Grid>
              ) :
              (
                <Typography  align='center' component='h2' variant='h5'>There are no posts to show at this time.</Typography>
              )
            }
            
          </main>
        </Container>
        
        </>
    )

}

export default Main