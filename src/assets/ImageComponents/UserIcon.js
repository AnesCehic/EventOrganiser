import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const UserIcon = props => (
  <Svg
    width={24}
    height={28}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M19 7A7 7 0 1 1 5 7a7 7 0 0 1 14 0Zm-2 0A5 5 0 1 0 7 7a5 5 0 0 0 10 0ZM3.5 16A3.5 3.5 0 0 0 0 19.5v.5c0 2.393 1.523 4.417 3.685 5.793C5.859 27.177 8.802 28 12 28c3.198 0 6.14-.823 8.315-2.207C22.477 24.417 24 22.393 24 20v-.5a3.5 3.5 0 0 0-3.5-3.5h-17ZM2 19.5A1.5 1.5 0 0 1 3.5 18h17a1.5 1.5 0 0 1 1.5 1.5v.5c0 1.473-.94 2.949-2.759 4.106C17.434 25.256 14.877 26 12 26s-5.434-.744-7.241-1.894C2.939 22.95 2 21.472 2 20v-.5Z"
      fill="#879099"
    />
  </Svg>
);

export default UserIcon;
