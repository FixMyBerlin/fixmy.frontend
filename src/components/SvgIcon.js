import { PureComponent } from 'react';

class SvgIcon extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      icon: null
    };
  }

  componentDidMount() {
    this.loadIcon();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.type !== this.props.type) {
      this.loadIcon();
    }
  }

  loadIcon = () => {
    import(`~/images/${this.props.type}.svg`).then((Icon) => {
      this.setState({ icon: Icon.default(this.props) });
    });
  };

  render() {
    return this.state.icon;
  }
}

export default SvgIcon;
