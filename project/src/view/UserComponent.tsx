import * as React from 'react';

export interface Props{
    data:{name:string};
}

export default class UserComponent extends React.Component<Props, object>{
    render(){
        return <div>{this.props.data.name}</div>
    }
}
