const h = React.createElement;

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            pageTitle: 'Wassap',
            tweets: [
                {
                    id: 0, user: 'Will', body: 'afejafkl'
                },
                {
                    id: 1, user: 'Timmy', body: 'lakjefkhae;kfh;aehfk'
                },
            ]
        };       
    }

    render() {
        const { tweets } = this.state;
        let deletePost = () => {
            console.log('click')
        }
        let addPost = (post) => {
            let newState = [...tweets, post];
            this.setState({tweets: newState})
        }
        return (

            h('div', {}, 

                h('h1', { className: 'main-header' }, "Wassap"),
                h(FormDocument, {addPost}),
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
            newWassap: ''
        }
    }
    render() {
        const {addPost} = this.props;
        return (
            h('form', {
                onSubmit: (event) => {
                    // event.preventDefault();
                    // console.log(event);
                    // this.state.newWassap
                    // console.log('submit!!!');
                }
            },
            [ 
                h('input', {
                    type: 'text',
                    value: this.state.newWassap,
                    onChange: (event) => {
                        let value = event.target.value
                        console.log(value);
                        this.setState({newWassap: value})
                    }
            }),
                h('input', { type: 'submit', value: 'Post'}),
            ]
            )
        )
    }
}

let DisplayPostList = ({posts}) => {
    return h('ul', null, posts.map(userPost => {
        // console.log(userPost);
        return h(postRow, { post: userPost, key: userPost.id, deletePost: userPost.deletePost})
    }))
}

let postRow = ({post, deletePost}) => {
    console.log(post);
    return h('li', null, [post.body, post.user], h('button', { onClick: () => deletePost.deletePost()}, 'Delete'))

}



ReactDOM.render(h(HomePage), document.querySelector('.react-root'));