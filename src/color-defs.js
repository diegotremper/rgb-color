const colorDefs = [
  {
    re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
    example: ['rgb(123, 234, 45)', 'rgb(255,234,245)'],
    process(bits) {
      return [
        parseInt(bits[1], 10),
        parseInt(bits[2], 10),
        parseInt(bits[3], 10),
      ];
    },
  },
  {
    re: /^(\w{2})(\w{2})(\w{2})$/,
    example: ['#00ff00', '336699'],
    process(bits) {
      return [
        parseInt(bits[1], 16),
        parseInt(bits[2], 16),
        parseInt(bits[3], 16),
      ];
    },
  },
  {
    re: /^(\w{1})(\w{1})(\w{1})$/,
    example: ['#fb0', 'f0f'],
    process(bits) {
      return [
        parseInt(bits[1] + bits[1], 16),
        parseInt(bits[2] + bits[2], 16),
        parseInt(bits[3] + bits[3], 16),
      ];
    },
  },
];

export default colorDefs;
