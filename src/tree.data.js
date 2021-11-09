const nodes = [ {
  id: 'kibibit',
  image: 'https://kibibit.io/logo-demo/logo.png',
  modalSelector: '#about-kibibit'
},
{
  id: 'achievibit',
  image: 'https://github.com/Kibibit/kibibit-assets/raw/master/logo-achi.png',
  modalSelector: '#about-readme',
  parentId: 'kibibit'
},
// {
//   "id": "achievibit-chrome-extension",
//   "image": "https://www.pivotaltracker.com/marketing_assets/integrations/2015/google-chrome-extension-6a26cdad27e6f383174791f8648fbe4cc7627acc06e3870c588217c98d1bde91.png",
//   "modalSelector": "#about-readme",
//    parentId: 'kibibit'
// },
{
  id: 'kibibit-code-editor',
  image: 'https://kibibit.io/logo-demo/code-editor.png',
  modalSelector: '#about-readme',
  parentId: 'kibibit'
},
{
  id: 'cli-lit',
  image: 'https://kibibit.io/kibibit-assets/cli-lit-logo-transparent.png',
  modalSelector: '#about-readme',
  parentId: 'kibibit'
},
{
  id: 'kb-components',
  image: 'https://kibibit.io/kibibit-assets/kb-components-logo-transparent.png',
  modalSelector: '#about-readme',
  parentId: 'kibibit'
},
{
  id: 'tdd1t',
  image: 'https://kibibit.io/kibibit-assets/4x/tdd1t-avatar-transparent%404x.png',
  modalSelector: '#about-readme',
  parentId: 'kibibit'
},
{
  id: 'kb-hologram',
  image: 'https://kibibit.io/kibibit-assets/kb-hologram/logo.svg',
  modalSelector: '#about-readme',
  parentId: 'kibibit'
},
{
  id: 'announce-it',
  image: 'https://camo.githubusercontent.com/b80d088e5a18d62cee79035f457e157792b4d99f/687474703a2f2f6b6962696269742e696f2f6b6962696269742d6173736574732f616e6e6f756e63652d69742e737667',
  modalSelector: '#about-readme',
  parentId: 'kibibit'
},
{
  id: 'cold-deck',
  image: 'https://kibibit.io/kibibit-assets/cold-deck/logo.svg',
  modalSelector: '#about-readme',
  parentId: 'kibibit'
},
{
  id: 'stacker',
  image: 'https://kibibit.io/kibibit-assets/stacker.png',
  modalSelector: '#about-readme',
  parentId: 'kibibit'
},
{
  id: 'hass-kibibit-theme',
  image: 'https://kibibit.io/kibibit-assets/hassio-theme/hassio-theme-logo-trans.png',
  modalSelector: '#about-readme',
  parentId: 'kibibit'
},
{
  id: 'command-lime',
  image: 'https://kibibit.io/command-lime/logo-clear.png',
  modalSelector: '#about-readme',
  parentId: 'kibibit'
},
{
  id: 'dev-tools',
  image: 'https://kibibit.io/dev-tools/logo.png',
  modalSelector: '#about-readme',
  parentId: 'kibibit'
},
{
  id: 'configit',
  image: 'https://kibibit.io/configit/logo.png',
  modalSelector: '#about-readme',
  parentId: 'kibibit'
}
  // {
  //   "id": "kb-login-page",
  //   "image": "https://camo.githubusercontent.com/01a1947671f7f77ecdd0096aa8d8f51b6aadaa4a/687474703a2f2f6b6962696269742e696f2f6b6962696269742d6173736574732f6c6f67696e2e737667",
  //   "modalSelector": "#about-readme",
  // parentId: 'kibibit'
  // },
  // {
  //   "id": "kb-profile-page",
  //   "image": "https://camo.githubusercontent.com/7620455813fc7ce4ed7f9017f188f301e371d2fb/687474703a2f2f6b6962696269742e696f2f6b6962696269742d6173736574732f70726f66696c652e737667",
  //   "modalSelector": "#about-readme",
  // parentId: 'kibibit'
  // }
];

module.exports = {
  nodes,
  edges: getEdgesFromNotes()
};

function getEdgesFromNotes() {
  return nodes
    .map((node, index) => {
      return {
        source: nodes.indexOf(nodes.find((parentNode) => parentNode.id === node.parentId)),
        target: index
      };
    })
    .filter((item) => item.source >= 0);
}
