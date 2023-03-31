const { ApolloServer, gql } = require('apollo-server');


const articles = [
  {
    id: '1',
    title: 'Article 1',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    authorId: '1',
    comments: [
      { title: 'Comment 1', content: 'Lorem ipsum dolor sit amet.', authorId: '2' },
      { title: 'Comment 2', content: 'Consectetur adipiscing elit.', authorId: '3' }
    ]
  },
  {
    id: '2',
    title: 'Article 2',
    content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    authorId: '2',
    comments: [
      { title: 'Comment 3', content: 'Ut enim ad minim veniam.', authorId: '1' },
      { title: 'Comment 4', content: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', authorId: '3' }
    ]
  }
];

const usersData = [
  {
    id: '1',
    fullname: 'Admin User',
    username: 'admin',
    email: 'admin@example.com',
    password: 'password',
    dob: '1990-01-01'
  },
  {
    id: '2',
    fullname: 'Alice User',
    username: 'alice',
    email: 'alice@example.com',
    password: 'password',
    dob: '1995-03-15'
  },
  {
    id: '3',
    fullname: 'Bob User',
    username: 'bob',
    email: 'bob@example.com',
    password: 'password',
    dob: '1985-07-04'
  }
];

const typeDefs = gql`
  type Query {
    articles: [Article!]!
    article(id: Int!): Article
  }

  type Mutation {
    createArticle(title: String!, content: String!): Article
  }

  type Article {
    id: Int!
    title: String!
    content: String!
    author: User!
    comments: [Comment!]!
  }

  type User {
    id: Int!
    fullname: String!
    username : String!
    email: String!
    password:String!
    dob: String!
  }

  type Comment {
    title: String!
    content: String!
    author: User!
  }
`;

const resolvers = {
  Query: {
    articles() {
      return articles;
    },
    article(_, { id }) {
      return articles.find(article => article.id === id);
    }
  },
  Mutation: {
    createArticle(_, { title, content }, context) {
      if (!context.user) {
        throw new Error('Unauthorized');
      }
      const id = String(articles.length + 1);
      const authorId = context.user.id;
      const article = { id, title, content, authorId, comments: [] };
      articles.push(article);
      return article;
    }
  },
  Article: {
    
    comments(article) {
      return article.comments.map(comment => ({ ...comment, author: usersData.find(user => user.id === comment.authorId) }));
    }
  },
  Comment: {
    author(comment) {
      return usersData.find(user => user.id === comment.authorId);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Basic ')) {
      const encodedCredentials = authHeader.slice(6);
      const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('ascii');
      const [username, password] = decodedCredentials.split(':');
      const user = usersData.find(user => user.username === username && user.password === password);
      return {user};
    }
  }
});

server.listen(3000).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});