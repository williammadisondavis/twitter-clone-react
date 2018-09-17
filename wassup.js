class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tweets: []
        };
    }
    componentDidMount() {
        console.log('hey')
        fetch('http://0.tcp.ngrok.io:11971/wassups.json')
          .then(response => response.json())
          .then(data => 
            this.setState({tweets: data}))
    };

    render() {
        const { tweets } = this.state;

        let deletePost = (userID) => {
            let updatedState = tweets.filter(post => {
                return post.id !== userID
            })
            this.setState({tweets: updatedState})
        }
        
        let addPost = (post) => {
            let newState = [...tweets, post];
            this.setState({ tweets: newState })
        }
        return (
            <div>
                <h1 className={'main-header'}>Wassap</h1>
                {<FormDocument addPost={ addPost }/>}
                {<DisplayPostList posts={ tweets } deletePost={deletePost}/>}
                <footer>Developer by Will Davis</footer>
                <a href="williamdav.is">My Website</a>
            </div>
        )
    }
}

class FormDocument extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            content: ''
        }
    }
    render() {
        const { addPost } = this.props;
        const {user, content} = this.state;
        let tweetBox = (event, updated) => {
            let newPost = {}
            newPost[updated] = event.target.value;
            this.setState(newPost);
        };
        let submitForm = (event) => {
            event.preventDefault();
            addPost(this.state)

        }
        return (
            <form onSubmit={submitForm}>
                <input type='text' value={user} onChange={(event)=>{tweetBox(event, 'user')}}/>
                <input type='text' value={content} onChange={(event)=>{tweetBox(event, 'content')}}/>
                <button type='submit'>Click me</button>
            </form>
        )}
    }



let DisplayPostList = ({ posts, deletePost }) => {
    return (
        <div>
            {posts.map(userPost => 
             (
                <ul key={userPost.id}>
                    {<PostRow
                    post={userPost}
                    deletePost={deletePost}
                    />}
                </ul>
            ))}
        </div>
    )
}

let PostRow = ({ post, deletePost }) => {
    // console.log(post);
    return (
        <li> {[ post.user, post.content]}
            <button onClick={() => deletePost(post.id)}>
            Delete Post
            </button>
        </li>
        
    )
}

ReactDOM.render(<HomePage/>, document.querySelector('.react-root'));
