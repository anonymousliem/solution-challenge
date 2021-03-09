import React, { Component } from 'react'
import {Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap'

export default class InputText extends Component {
    render() {
        return (
            <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className={this.props.icon}></i>
                {this.props.text}
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text' placeholder={this.props.placeholder} name={this.props.name} />
          </InputGroup>
        )
    }
}
