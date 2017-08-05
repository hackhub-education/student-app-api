var Student = React.createClass({
    getInitialState: function() {
        return {}
    },
    handleClick: function() {
        var ReactThis = this;
        axios.get('http://localhost:3000/student/' + this.props.data._id)
            .then(function(response) {
                console.log(response.data);
                ReactThis.setState(response.data);
            })
            .catch(function(error) {
                console.log(error)
            })
    },
    handleSubmit: function(e) {
        e.preventDefault();
        axios.put('http://localhost:3000/student/' + this.props.data._id, this.state)
            .then(function(response) {
                // ReactThis.setState({
                //     studentList: response.data
                // })
                console.log(response)
            })
            .catch(function(error) {
                console.log(error)
            })
    },
    handleChange: function(e) {
        var studentObj = this.state
        studentObj[e.target.name] = e.target.value
        this.setState(studentObj)
    },
    handleDelete: function() {
        var ReactThis = this
        var studentObj = this.state
        axios.delete('http://localhost:3000/student' + this.props.data._id, this.state)
            .then(function(response) {
                ReactThis.props.remove(studentObj);
                console.log(response)
            })
            .catch(function(error) {
                console.log(error)
            })
    },
    render: function() {
        if (this.state.firstname) {
            var nameNode = (
                <div>
                    <h2>Name: {this.state.firstname}</h2>
                    <h2>Age: {this.state.age}</h2>
                    <h2>School: {this.state.school}</h2>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" name="firstname" placeholder="First Name" onChange={this.handleChange} value={this.state.firstname}/>
                        <input type="text" name="age" placeholder="Age"  onChange={this.handleChange} value={this.state.age}/>
                        <input type="text" name="school" placeholder="School"  onChange={this.handleChange} value={this.state.school}/>
                        <button>Submit</button>
                    </form>
                    <button onClick={this.handleDelete}>Delete</button>
                </div>
            )
        } else {
            var nameNode = <h2 onClick={this.handleClick}>{this.props.data.firstname}</h2>
        }
        return (
            <div>
                {nameNode}

                <hr/>
            </div>
        )
    }
})

var StudentForm = React.createClass({

    getInitialState: function() {
        return {
            firstname: "",
            age: "",
            school: ""
        }
    },

    handleSubmit: function(e) {
        e.preventDefault();
        axios.post('http://localhost:3000/student', this.state)
            .then(function(response) {
                // ReactThis.setState({
                //     studentList: response.data
                // })
                console.log(response)
            })
            .catch(function(error) {
                console.log(error)
            })
    },

    handleChange: function(e) {
        var studentObj = this.state
        studentObj[e.target.name] = e.target.value
        this.setState(studentObj)
    },

    render: function() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="firstname" placeholder="First Name" onChange={this.handleChange}/>
                <input type="text" name="age" placeholder="Age"  onChange={this.handleChange}/>
                <input type="text" name="school" placeholder="School"  onChange={this.handleChange}/>
                <button>Submit</button>
            </form>
        )
    }

})

var StudentList = React.createClass({
    getInitialState: function() {
      return {
          studentList: [],
      }
    },
    removeFromList: function(obj) {
        // Remove obj from student list and update state

        var oldStudentList = this.state.studentList
        var newStudentList = oldStudentList.filter(function(student) {
            return student._id !== obj._id;
        });
        this.setState({
            studentList: newStudentList
        })
    },
    componentDidMount: function() {
        var ReactThis = this;
        axios.get('http://localhost:3000/student')
            .then(function(response) {
                ReactThis.setState({
                    studentList: response.data
                })
            })
            .catch(function(error) {
                console.log(error)
            })
    },


    render: function() {
        var ReactThis = this;
        return (<div>
            {
                this.state.studentList.map(
                    function(currentStudent) {
                        return <Student data={currentStudent} remove={ReactThis.removeFromList} key={currentStudent._id}/>
                    }
                )
            }
            <StudentForm/>
        </div>)
    }

})

ReactDOM.render(
    <StudentList/>, document.getElementById('app')
)