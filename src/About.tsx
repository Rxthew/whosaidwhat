import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const About = function () {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography component="h2" variant="h5" sx={{ py: 2 }}>
          <strong>Welcome to Who said What</strong>
        </Typography>
        <Paper
          sx={{ backgroundColor: "#f6f8fa", p: { xs: 2, sm: 8 } }}
          variant="elevation"
        >
          <Typography
            gutterBottom={true}
            paragraph={true}
            sx={{
              letterSpacing: "0.03rem",
              lineHeight: "1.75",
              whiteSpace: "pre-line",
            }}
          >
            Who said What is a template for a blog where the comments' authors
            are anonymous, unless you are enrolled as a member. Different
            membership levels provide different privileges:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="A regular membership lets you view the identity of comment authors. All you need to do is provide your username and password."
                inset={true}
                primaryTypographyProps={{
                  style: {
                    letterSpacing: "0.03rem",
                    lineHeight: "1.75",
                    whiteSpace: "pre-line",
                  },
                }}
              />
            </ListItem>
          </List>
          <List>
            <ListItem>
              <ListItemText
                primary="A privileged membership gives you the privilege to post your own comments, edit, and delete them. A privileged account is the same as a regular one, except that you have to input the privilege code when signing up."
                inset={true}
                primaryTypographyProps={{
                  style: {
                    letterSpacing: "0.03rem",
                    lineHeight: "1.75",
                    whiteSpace: "pre-line",
                  },
                }}
              />
            </ListItem>
          </List>
          <List>
            <ListItem>
              <ListItemText
                primary="The highest membership tier is admin. This gives you access over all posts, users and comments. However, this takes place at a dedicated front end. Gaining access to an admin account is similar to the privileged version, except that instead of the privilege code you have to provide the admin code when signing up. "
                inset={true}
                primaryTypographyProps={{
                  style: {
                    letterSpacing: "0.03rem",
                    lineHeight: "1.75",
                    whiteSpace: "pre-line",
                  },
                }}
              />
            </ListItem>
          </List>
          <Typography
            gutterBottom={true}
            paragraph={true}
            sx={{
              letterSpacing: "0.03rem",
              lineHeight: "1.75",
              whiteSpace: "pre-line",
            }}
          >
            For a better understanding of the context of this project please
            refer to the{" "}
            <Link href="https://www.github.com/rxthew/whosaidwhatapi">
              Who Said What API's repository on Github.
            </Link>
          </Typography>
        </Paper>
      </Container>
    </>
  );
};

export default About;
