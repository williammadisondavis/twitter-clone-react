const h = React.createElement;

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            pageTitle: 'Wassap',
            tweets: [
                {
                    id: 0, user: 'Will', body: ' react is g'
                },
                {
                    id: 1, user: 'Timmy', body: 'lakjefkhae;kfh;aehfk'
                },
            ]
        };
    }

    render() {
        const { tweets } = this.state;

        let deletePost = (userID) => {
            let updatedState = tweets.filter(post => {
                return post.id !== userID
            })
            // console.log(updatedState)
            this.setState({tweets: updatedState})
        }
        
        let addPost = (post) => {
            let newState = [...tweets, post];
            this.setState({ tweets: newState })
        }
        return (

            h('div', {},

                h('h1', { className: 'main-header' }, "Wassap"),
                h(FormDocument, { addPost }),
                h(DisplayPostList, { posts: tweets, deletePost: deletePost }),
                h('footer', {}, ['Developed by Will Davis']),
                h('a', { href: 'williamdav.is' }, ['My Website'])

            ))
    }
}

class FormDocument extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            body: ''
        }
    }
    render() {
        const { addPost } = this.props;
        const {user, body} = this.state;
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
                <input type='text' value={body} onChange={(event)=>{tweetBox(event, 'body')}}/>
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
{/* // return h('ul', null, posts.map(userPost => 
    //     // console.log(userPost);
    //     return h(postRow, { post: userPost, deletePost: userPost.deletePost })
    // })) */}

let PostRow = ({ post, deletePost }) => {
    // console.log(post);
    return (
        <li> {[post.body, post.user]}
            <button onClick={() => deletePost(post.id)}>
            Delete Post
            </button>
        </li>
        
    )
}

// (<li> [post.body, post.user] </li>,
//     <button onClick={ () => deletePost.deletePost() }/>)


ReactDOM.render(<HomePage/>, document.querySelector('.react-root'));
