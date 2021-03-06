import { Component, createRef } from "inferno";
import { classes } from "common/react";
import { Box } from './Box';
import { Icon } from './Icon';

export class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected,
      open: false,
    };
    this.handleClick = event => {
      if (this.state.open) {
        this.setOpen(false);
      }
    };
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleClick);
  }

  setOpen(open) {
    this.setState({ open: open });
    if (open) {
      setTimeout(() => window.addEventListener("click", this.handleClick));
    } else {
      window.removeEventListener("click", this.handleClick);
    }
  }

  setSelected(selected) {
    this.setState({
      selected: selected,
    });
    this.setOpen(false);
    this.props.onSelected(selected);
  }

  buildMenu() {
    const { options = [] } = this.props;
    const ops = options.map(option => (
      <div
        key={option}
        className="Dropdown__menuentry"
        onClick={e => {
          this.setSelected(option);
        }}
      >
        {option}
      </div>
    ));
    return ops.length ? ops : "No Options Found";
  }

  render() {
    const { props } = this;
    const {
      color = "default",
      over,
      width,
      onClick,
      onSet,
      selected,
      ...boxProps
    } = props;
    const {
      className,
      ...rest
    } = boxProps;

    const adjustedOpen = over ? !this.state.open : this.state.open;

    const menu = this.state.open ? (
      <Box
        width={width}
        className={classes([
          "Dropdown__menu",
          over && "Dropdown__over",
        ])}
      >
        {this.buildMenu()}
      </Box>
    ) : null;

    return (
      <div
        className="Dropdown"
      >
        <Box
          width={width}
          className={classes([
            "Dropdown__control",
            "Button",
            "Button--color--" + color,
            className,
          ])}
          {...rest}
          onClick={e => {
            this.setOpen(!this.state.open);
          }}
        >
          <span
            className="Dropdown__selected-text"
          >
            {this.state.selected}
          </span>
          <span
            className={classes([
              "Dropdown__arrow-button",
            ])}
          >
            <Icon
              name={adjustedOpen ? "chevron-up" : "chevron-down"}
            />
          </span>
        </Box>
        {menu}
      </div>
    );
  }
}
