import Badge from '@mui/material/Badge';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Comment from '@mui/icons-material/Comment'
import CssBaseline  from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


interface postPreviewProps {
  post: {
    date: string;
    content: string;
    title: string;
  };
}



const PostPreview = function PostPreview(props: postPreviewProps) {
  const { post } = props;

  const commentsCount = 1 //change to post.comments.length - 1;

  const truncatePostContent = function truncatePostContent(content:string){
    return content.substring(0,350) + '...'
  }

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
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
              <Typography variant="subtitle1" color="primary">
                  Continue reading...
              </Typography>
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

   //default no posts.

   const posts = [{
     title: 'This title',
     content: 'All the content you can think about is here to be entertaining and useful' +
     ' in equal degree so that you can bla bla bla bla bla bla bla bal here to be entertaining and useful' +
     ' here to be entertaining and useful  here to be entertaining and useful  here to be entertaining and useful' +
     ' here to be entertaining and useful here to be entertaining and useful here to be entertaining and useful',
     date: new Date(Date.now()).toString()
   },

    {
      title: 'This second title',
     content: 'All the secondary content you can think about is here to be entertaining and useful' +
     ' in equal degree so that you can bla bla bla bla bla bla bla bal here to be entertaining and useful' +
     ' here to be entertaining and useful  here to be entertaining and useful  here to be entertaining and useful' +
     ' here to be entertaining and useful here to be entertaining and useful here to be entertaining and useful',
     date: 'Nov 8 11'
    }
  ]
    

    return (
        <>
        <CssBaseline />
        <Container maxWidth="lg" sx={{py:4}}>
          <main>
            <Grid container spacing={4}>
              {posts.map(
                function convertToPreview(post){
                  return <PostPreview key={post.title} post={post} />
              })}
            </Grid>
          </main>
        </Container>
        
        </>
    )

}

export default Main