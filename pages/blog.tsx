import React, {FunctionComponent, Component} from 'react';
import axios from 'axios'
import Layout from '../components/Layout';
import Article from '../components/Article';

interface BlogProps {
}
interface BlogState {
    articles: Array<object>,
    loaded: boolean,
    search: string,
    filteredArticles: Array<object>,
}
class Blog extends Component<BlogProps, BlogState> {
constructor(props:any){
    super(props)
    this.state = {
        articles:[],
        loaded: false,
        search: '',
        filteredArticles:[]
    }
}

componentDidMount(){
    this.fetchArticles()
}

fetchArticles = ()=>{
    let config = new Object();
    config = {
        method: 'get',
        url: `https://upply-interview.herokuapp.com/`,
        timeout: 20000
    };

    axios(config)
        .then(res => {
            res.data.sort(function(a, b) {
                let dateA = new Date(a.release).getTime(), dateB = new Date(b.release).getTime();
                return dateA - dateB;
            });
            this.setState({articles: res.data, loaded:true})
            }
        )
        .catch((err) => {
            console.log(err)
        });
}

renderArticle(articles) {
    return articles.map(article => <Article article={article} key={article.id}/>);
}
handleSelectChange = (event) => {
    let direction = event.target.value;
    let sortedArray = this.state.articles;
    sortedArray.sort(function(a:any, b:any) {
        let dateA = new Date(a.release).getTime(), dateB = new Date(b.release).getTime();
        if(direction = 'asc'){
            return dateA - dateB;
        } else {
            return dateB - dateA;
        }
    });
    this.setState({articles: sortedArray});
}
handlechange = (event) => {
    let search = event.target.value;

    /*let filteredArticles = this.state.articles.filter((article:any)=>{
       !article.text.includes(search)
    });*/
    let filteredArticles = this.state.articles;
    filteredArticles.forEach((article:any,index)=>{
        if(!article.text.includes(search)||!article.title.includes(search)){
            delete filteredArticles[index];
        }
    })
   this.setState({
       search: search,
       filteredArticles: filteredArticles
   })
}

render(){
    let {articles, loaded, filteredArticles} = this.state
    return(
        <Layout>
            <div>
            <input
                type="text"
                placeholder="Search"
                name="search"
                onChange={this.handlechange}
            />
            <select onChange={this.handleSelectChange}>
                <option selected value="asc">asc</option>
                <option value="desc">desc</option>
            </select>    
            {loaded?filteredArticles.length>0?this.renderArticle(filteredArticles):this.renderArticle(articles):<div>Loading</div>}

            </div>
        </Layout>
    )
}
}

export default Blog;
