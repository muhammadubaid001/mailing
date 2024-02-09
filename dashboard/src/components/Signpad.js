import { Button } from "@material-tailwind/react";
import React, { Component, Fragment } from "react";
import SignaturePad from "react-signature-canvas";

class SignPad extends Component {
  constructor(props) {
    super(props);
    this.state = { trimmedDataURL: null };
  }
  sigPad = {};

  clear = () => {
    this.sigPad.clear();
  };

  trim = () => {
    this.setState({
      trimmedDataURL: this.sigPad.getTrimmedCanvas().toDataURL("image/png"),
    });
    this.props.setState({
      ...this.props.state,
      sign: this.sigPad.getTrimmedCanvas().toDataURL("image/png"),
    });
  };
  render() {
    const { trimmedDataURL } = this.state;
    return (
      <Fragment>
        <div className="h-60 w-full overflow-hidden shadow-sm border border-gray-400 rounded-xl">
          <div className="sigContainer">
            <SignaturePad
              canvasProps={{ className: "sigPad" }}
              ref={(ref) => {
                this.sigPad = ref;
              }}
            />
          </div>
        </div>

        <div className="flex items-start gap-2">
          {trimmedDataURL ? (
            <img
              className="h-44 w-44 object-contain"
              src={trimmedDataURL}
              alt=""
            />
          ) : null}
          <div className="items-center gap-3 flex mt-4">
            <Button size="sm" color="blue" type="button" onClick={this.trim}>
              Sign
            </Button>
            <Button
              size="sm"
              type="button"
              color="blue"
              variant="outlined"
              onClick={this.clear}
            >
              Clear
            </Button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SignPad;
