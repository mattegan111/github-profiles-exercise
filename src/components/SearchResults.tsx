import { useState, useEffect } from "react";
const token = process.env.REACT_APP_TOKEN

function SearchResults(props: {submittedQuery: string}) {
  interface userType {
    avatar_url?: string, 
    login?: string 
  }

  useEffect(() => {
    if(props.submittedQuery.length > 0){
      getUser(props.submittedQuery);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.submittedQuery]);

  const [user, setUser] = useState<userType>({});
  const [userFollowersCount, setUserFollowersCount] = useState();
  const [userRepos, setUserRepos] = useState<Array<any>| undefined>();
  const [userReposCount, setUserReposCount] = useState();
  
  async function getUser(username:string) {
    let usernameFound = true;
    let followersURL : string = '';
    let reposURL : string = '';

    const userRes = await fetch(`https://api.github.com/search/users?q=${username}`, {
      method: "GET",
      headers: {
        Authorization: `${token}` 
      }
    });
    await userRes.json().then(res => {
      if(res.total_count === 0) {
        usernameFound = false;
        alert(`${username} was not found`);
        return;
      }
      followersURL = res.items[0].followers_url;
      reposURL = res.items[0].repos_url;
      setUser(res.items[0]);
    });

    if(usernameFound){
      const userFollowersRes = await fetch(followersURL, {
        method: "GET",
        headers: {
          Authorization: `${token}` 
        }
      });
      userFollowersRes.json().then(res => {
        setUserFollowersCount(res.length);
      });
  
      const userReposRes = await fetch(reposURL, {
        method: "GET",
        headers: {
          Authorization: `${token}` 
        }
      });
      userReposRes.json().then(res => {
        setUserRepos(res);
        setUserReposCount(res.length);
        orderReposByLatest(res);
      });
    }
  }

  function orderReposByLatest(repos : Array<any>){
    let arrSorted = repos.sort((a, b) => 
      b.id - a.id //id are used as a proxy for creation date
    );
    arrSorted = arrSorted.slice(0, 4);
    setUserRepos(arrSorted);
  }

  return (
    <div className="horizontal-align search-results">
      <div className="padding-sm min-width-150">
        {user.avatar_url &&
          <img src={user.avatar_url} alt="User Avatar" width="100px"></img>
        }
        <h3>
          {user.login && user.login}
        </h3>
        <p>
          {userFollowersCount && 
            <p>{userFollowersCount} Followers</p>
          }
        </p>
        <p>
          {userReposCount && 
            <p>{userReposCount} Repositories</p>
          }
        </p>
      </div>
      <div className="padding-sm min-width-330">
        {userRepos && 
          <>
            <h3>Most Recent Repositories:</h3>
            {userRepos.map(repo => {
              return (
                <div key={repo.id}>
                  <p>
                    {repo.language &&
                      <p><a href={repo.html_url}>{repo.name}</a>, in {repo.language}</p>
                    }
                    {!repo.language &&
                      <p>{repo.name}</p>
                    }
                  </p>
                </div>
              )
            })}
          </>
        }
      </div>
    </div>
  )
}

export default SearchResults;