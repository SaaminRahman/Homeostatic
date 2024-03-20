//Some useful functions
function findItemIndex(array, item) {
  var x = array.findIndex((element) => element == item);
  return x;
}
function istrue(exp, func) {
  if (exp == true) {
    return true;
  }
  func();
  return false;
}

//....................................................................

//Building homeostatic object
var homeostatic = {
  getfosterParentNumberByName: function (name) {
    var a;
    for (a = 0; a < this.fosterParents.length; a++) {
      if (this.fosterParents[a].name === name) {
        return a;
      } else {
        return null;
      }
    }
  },
  getRealParentNumberByName: function (name) {
    var a;
    for (a = 0; a < this.realParents.length; a++) {
      if (this.realParents[a].name === name) {
        return a;
      } else {
        return null;
      }
    }
  },
  getParentByName(name) {
    var a;
    for (a = 0; a < this.realParents.length; a++) {
      if (this.realParents[a].name === name) {
        return this.realParents[a];
      } else {
        var a;
        for (a = 0; a < this.fosterParents.length; a++) {
          if (this.fosterParents[a].name === name) {
            return this.fosterParents[a];
          } else {
            return null;
          }
        }
      }
    }
  },
  get windowWidth() {
    return document.getElementsByTagName("HTML")[0].clientWidth - 8;
  },
  concernedNodes: [],
};

homeostatic.configure = function () {
  var real = document.querySelectorAll("[data-h-parenttype='real']");
  var realData = [];

  for (let a = 0; a < real.length; a++) {
    homeostatic.concernedNodes.push(real[a]);
    realData.push({
      name: real[a].getAttribute("data-h-parent")?.split(",")[0],
      width: window.getComputedStyle(real[a]).getPropertyValue("width"),
      isWidthFixedByInlineStyle: real[a].style.width,
      percentage: real[a].getAttribute("data-h-managewidth")?.split(",")[0],
      innerHTML: real[a].innerHTML,
      domElement: real[a],
      styleClass: real[a].getAttribute("data-h-managestyle"),
      contentJustification: real[a].getAttribute("data-h-justifycontent"),
      children: [],
      currentWidth: null,
      display: window.getComputedStyle(real[a]).getPropertyValue("display"),
      childOnLeave: [],
    });
  }
  homeostatic.realParents = realData;

  var foster = document.querySelectorAll("[data-h-parenttype='foster']");
  var fosterData = [];
  var d;
  for (d = 0; d < foster.length; d++) {
    homeostatic.concernedNodes.push(foster[d]);
    fosterData.push({
      name: foster[d].getAttribute("data-h-parent").split(",")[0],
      width: window.getComputedStyle(foster[d]).getPropertyValue("width"),
      isWidthFixedByInlineStyle: foster[d].style.width,
      display: window.getComputedStyle(foster[d]).getPropertyValue("display"),
      percentage: foster[d].getAttribute("data-h-managewidth")?.split(",")[0],
      innerHTML: foster[d].innerHTML,
      domElement: foster[d],
      contentJustification: foster[d].getAttribute("data-h-justifycontent"),
      styleClass: foster[d].getAttribute("data-h-managestyle"),
      children: [],
      sendingRequest: [],
      recievingRequest: [],
      getChildByName: function (name) {
        var f;
        for (f = 0; f < this.children.length; f++) {
          if (this.children[f].name == name) {
            var result = {
              index: f,
              object: this.children[f],
            };
            return result;
          }
        }
        return null;
      },
    });
  }
  homeostatic.fosterParents = fosterData;
  var childNodes = document.querySelectorAll("[data-h-childof]");
  var c, k;

  for (c = 0; c < homeostatic.realParents.length; c++) {
    var child = [];
    for (k = 0; k < childNodes.length; k++) {
      if (
        childNodes[k]
          .getAttribute("data-h-childof")
          .split(",")
          .includes(homeostatic.realParents[c].name) == true
      ) {
        child.push(childNodes[k]);
      }
    }
    var childdata = [];
    var b;
    for (let b = 0; b < child.length; b++) {
      homeostatic.concernedNodes.push(child[b]);
      childdata.push({
        parent: homeostatic.realParents[c].name,
        width: window.getComputedStyle(child[b]).getPropertyValue("width"),
        isWidthFixedByInlineStyle: child[b].style.width,
        outerHTML: child[b].outerHTML,
        domElement: child[b],
        currentDomElement: child[b],
        id: child[b].id,
        childNumber: b,
        percentage: child[b]
          .getAttribute(
            "data-" + homeostatic.realParents[c].name + "-managewidth"
          )
          ?.split(",")[0],
        unset: child[b]
          .getAttribute(
            "data-" + homeostatic.realParents[c].name + "-managewidth"
          )
          ?.split(",")[1],
        type: child[b]
          .getAttribute(
            "data-" + homeostatic.realParents[c].name + "-childtype"
          )
          ?.split(",")[0],
        leaveFor: child[b]
          .getAttribute(
            "data-" + homeostatic.realParents[c].name + "-childtype"
          )
          ?.split(",")[1],
        styleClass: child[b].getAttribute(
          "data-" + homeostatic.realParents[c].name + "-managestyle"
        ),
        domParent: child[b].parentNode,
        display: window.getComputedStyle(child[b]).getPropertyValue("display"),
        isGotOut: false,
        isManaged: false,
        name: homeostatic.realParents[c].name + "-" + b,
      });
    }
    homeostatic.realParents[c].children = childdata;
  }
};
console.log(homeostatic);

homeostatic.main = function () {
  observer.disconnect();
  var i;
  for (i = 0; i < homeostatic.realParents.length; i++) {
    var children = homeostatic.realParents[i].children;
    var windowWidth = document.getElementsByTagName("HTML")[0].clientWidth - 8;

    if (
      Number(homeostatic.realParents[i].width.split("px").join("")) >
      windowWidth
    ) {
      if (homeostatic.realParents[i].percentage != null) {
        var percent =
          (Number(windowWidth) *
            Number(
              homeostatic.realParents[i].percentage.split("%").join("")
            )) /
          100;
        homeostatic.realParents[i].domElement.style.width =
          String(percent) + "px";
        homeostatic.realParents[i].currentWidth = String(percent) + "px";
      }
      homeostatic.realParents[i].domElement.classList.add(
        homeostatic.realParents[i].styleClass
      );
      var k;
      for (k = 0; k < children.length; k++) {
        switch (children[k].type) {
          case "dead":
            children[k].domElement.style.display = "none";

            break;
          case "getOut":
            if (children[k].isGotOut == false) {
              homeostatic.fosterParents[
                homeostatic.getfosterParentNumberByName(children[k].leaveFor)
              ]?.recievingRequest.push(children[k]);
              children[k].domElement.style.display = "none";
              children[k].isGotOut = true;
              children[k].domElement.removeAttribute("id");
              homeostatic.realParents[i].childOnLeave.push(children[k]);
            }
            break;
          case "manage":
            if (children[k].percentage != null) {
              if (children[k].percentage == "inRatio") {
                children[k].domElement.style.width =
                  String(
                    Number(
                      homeostatic.realParents[i].currentWidth
                        .split("px")
                        .join("")
                    ) *
                      (Number(children[k].width.split("px").join("")) /
                        Number(
                          homeostatic.realParents[i].width
                            .split("px")
                            .join("")
                        ))
                  ) + "px";
                children[k].isManaged = true;
              } else {
                children[k].domElement.style.width =
                  String(
                    (Number(
                      homeostatic.realParents[i].currentWidth
                        .split("px")
                        .join("")
                    ) *
                      Number(children[k].percentage.split("%").join(""))) /
                      100
                  ) + "px";
                children[k].isManaged = true;
              }
            }
            children[k].domElement.classList.add(children[k].styleClass);
            children[k].isManaged = true;

            break;
          case "takeBirth":
            children[k].domElement.style.display = children[k].display;
            if (children[k].percentage != null) {
              if (children[k].percentage == "inRatio") {
                children[k].domElement.style.width =
                  String(
                    Number(
                      homeostatic.realParents[i].currentWidth
                        .split("px")
                        .join("")
                    ) *
                      (Number(children[k].width.split("px").join("")) /
                        Number(
                          homeostatic.realParents[i].width
                            .split("px")
                            .join("")
                        ))
                  ) + "px";
              } else {
                children[k].domElement.style.width =
                  String(
                    (Number(
                      homeostatic.realParents[i].currentWidth
                        .split("px")
                        .join("")
                    ) *
                      Number(children[k].percentage.split("%").join(""))) /
                      100
                  ) + "px";
              }
            }
        }
      }
    } else {
      if (homeostatic.realParents[i].isWidthFixedByInlineStyle == "") {
        homeostatic.realParents[i].domElement.style.width = "";
      } else {
        homeostatic.realParents[i].domElement.style.width =
          homeostatic.realParents[i].width;
      }

      homeostatic.realParents[i].domElement.classList.remove(
        homeostatic.realParents[i].styleClass
      );
      var n;
      for (n = 0; n < children.length; n++) {
        if (children[n].type != null) {
          switch (children[n].type) {
            case "takeBirth":
              children[n].domElement.style.display = "none";
              if (children[n].isWidthFixedByInlineStyle == "") {
                children[n].domElement.style.width = "";
              } else {
                children[n].domElement.style.width = children[n].width;
              }

              break;
            case "dead":
              children[n].domElement.style.display = children[n].display;
              break;
            case "getOut":
              if (children[n].isGotOut === true) {
                children[n].domElement.style.display = children[n].display;
                children[n].domElement.id = children[n].id;
                children[n].isGotOut = false;
                homeostatic.realParents[i].childOnLeave.splice(
                  findItemIndex(
                    homeostatic.realParents[i].childOnLeave,
                    children[n]
                  ),
                  1
                );
                homeostatic.fosterParents[
                  homeostatic.getfosterParentNumberByName(children[n].leaveFor)
                ].sendingRequest.push(children[n]);
              }
              break;
            case "manage":
              if (children[n].isManaged === true) {
                if (children[n].isWidthFixedByInlineStyle == "") {
                  children[n].domElement.style.width = "";
                } else {
                  children[n].domElement.style.width = children[n].width;
                }
                children[n].domElement.classList.remove(children[n].styleClass);
              }
          }
        }
      }
    }
  }
  var w, x, y, z, v;
  var foster = homeostatic.fosterParents;
  for (w = 0; w < foster.length; w++) {
    var recRequestlength = foster[w].recievingRequest.length;
    for (y = 0; y < recRequestlength; y++) {
      var clone = foster[w].recievingRequest[0].domElement.cloneNode(true);
      clone.style.display = foster[w].recievingRequest[0].display;
      clone.id = foster[w].recievingRequest[0].id;
      var newChild = foster[w].domElement.appendChild(clone);
      foster[w].recievingRequest[0].currentDomElement = newChild;
      foster[w].children.push(foster[w].recievingRequest[0]);
      foster[w].recievingRequest.shift();
    }
    var sendReqLength = foster[w].sendingRequest.length;
    for (x = 0; x < sendReqLength; x++) {
      foster[w].domElement.removeChild(
        foster[w].getChildByName(foster[w].sendingRequest[0].name).object
          .currentDomElement
      );
      foster[w].children.splice(
        foster[w].getChildByName(foster[w].sendingRequest[0].name).index,
        1
      );
      foster[w].sendingRequest.shift();
    }
    var children = foster[w].children;

    if (
      foster[w].percentage != null ||
      Number(foster[w].percentage.split("%").join("")) != NaN
    ) {
      if (
        Number(foster[w].width.split("px").join("")) > homeostatic.windowWidth
      ) {
        var percent =
          (Number(homeostatic.windowWidth) *
            Number(foster[w].percentage.split("%").join(""))) /
          100;
        foster[w].domElement.style.width = String(percent) + "px";
        foster[w].currentWidth = String(percent) + "px";
        foster[w].domElement.classList.add(foster[w].styleClass);
        for (z = 0; z < children.length; z++) {
          children[z].currentDomElement.classList.add(children[z].styleClass);

          if (children[z].percentage != null) {
            if (children[z].percentage == "inRatio") {
              children[z].currentDomElement.style.width =
                String(
                  Number(foster[w].currentWidth.split("px").join("")) *
                    (Number(children[z].width.split("px").join("")) /
                      Number(foster[w].width.split("px").join("")))
                ) + "px";
              children[z].isManaged = true;
            } else {
              children[z].currentDomElement.style.width =
                String(
                  (Number(foster[w].currentWidth.split("px").join("")) *
                    Number(children[z].percentage.split("%").join(""))) /
                    100
                ) + "px";
              children[z].isManaged = true;
            }
          }
        }
      } else {
        foster[w].domElement.style.width = foster[w].width;
        foster[w].domElement.classList.remove(foster[w].styleClass);
        for (v = 0; v < children.length; v++) {
          if (children[v].isManaged === true) {
            children[v].currentDomElement.classList.remove(children[v].styleClass);
            children[v].currentDomElement.style.width = children[v].width;
          }
        }
      }
    }
  }
  observer.observe(document.body, observerOptions);
};
homeostatic.run = function () {
  setTimeout(homeostatic.main, 3);
  window.addEventListener("resize", homeostatic.main);
  observer.observe(document.body, observerOptions);
};
//........................................................................

//Proof read

homeostatic.checkValidity = () => {
  function checkWidthManagingPercentage(obj) {
    if (obj.percentage == null) {
      console.log(
        "Width managing percentage is not mentioned, layout may not be optimum for the element(if it is done intentionally then you may ignore the message):",
        obj.domElement
      );
    } else {
      if (
        isNaN(Number(obj.percentage.split("%").join(""))) ||
        Number(obj.percentage.split("%").join("")) == 0
      ) {
        console.log(
          "Width managing percentage is invalid for the element:",
          obj.domElement
        );
      }
    }
  }
  homeostatic.realParents.forEach((element) => {
    checkWidthManagingPercentage(element);
    element.children.forEach((element) => {
      if (element.type == null) {
        console.log(
          "Child type is not mentioned for the element:",
          element.domElement
        );
      } else {
        if (element.type == "manage" || element.type == "takeBirth") {
          checkWidthManagingPercentage(element);
        }
        if (element.type == "getOut") {
          if (element.leaveFor == null) {
            console.log(
              "No foster parent is mentioned for the element to go for :",
              element.domElement
            );
          } else {
            if (
              homeostatic.getfosterParentNumberByName(element.leaveFor) == null
            ) {
              console.log(
                "The mentioned foster parent is not found for the element:",
                element.domElement
              );
            }
          }
        }
      }
    });
  });

  homeostatic.fosterParents.forEach((element) => {
    checkWidthManagingPercentage(element);
  });
};
//DOM Change handling

var domTask = [];

function isWidthOrDisplayChanged(node, styleOldValue) {
  function checkAttributeChange(attrname, domNode, styleoldValue) {
    var newValue = Number(
      window
        .getComputedStyle(domNode)
        .getPropertyValue("width")
        .split("px")
        .join("")
    );
    if (newValue) {
      var oldValue = Number(
        homeostatic
          .getParentByName(domNode.getAttribute("data-h-parent"))
          .width.split("px")
          .join("")
      );
      if (newValue != oldValue) {
        return [attrname, newValue];
      }
    }

    return false;
  }
  var widthChange = checkAttributeChange("width", node, styleOldValue);
  var displayChange = checkAttributeChange("display", node, styleOldValue);
  if (widthChange) {
    return widthChange;
  }
  if (displayChange) {
    return displayChange;
  }
  return false;
}

function isConcernedNodeChanged(target) {
  if (homeostatic.concernedNodes.some((item) => item === target)) {
    return true;
  }
  return false;
}

const observer = new MutationObserver(callback);
var observerOptions = {
  subtree: true,
  childList: true,
  attributeOldValue: true,
};

function callback(list, observer) {
  observer.disconnect();
  list.forEach((mutation) => {
    if (
      isConcernedNodeChanged(mutation.target) &&
      mutation.type == "attributes" &&
      mutation.attributeName == "style"
    ) {
      if (isWidthOrDisplayChanged(mutation.target, mutation.oldValue)) {
        var changeInfo = isWidthOrDisplayChanged(
          mutation.target,
          mutation.oldValue
        );
        domTask.push({
          node: mutation.target,
          attribute: changeInfo[0],
          value: changeInfo[1],
        });
      }
    }
  });

  homeostatic.realParents.forEach((item, index) => {
    item.domElement.style.display = item.display;

    if (item.isWidthFixedByInlineStyle == "") {
      item.domElement.style.width = "";
    } else {
      item.domElement.style.width = item.width;
    }

    item.domElement.classList.remove(item.styleClass);

    // if(item.name=="s"){ item.children.forEach((value) => {console.log(value.domElement)});}

    item.children.forEach((value) => {
      value.domElement.style.display = value.display;
      if (value.isWidthFixedByInlineStyle == "") {
        value.domElement.style.width = "";
      } else {
        value.domElement.style.width = value.width;
      }

      value.domElement.classList.remove(value.styleClass);
    });
  });
  homeostatic.fosterParents.forEach((itm) => {
    itm.children.forEach((val) => {
      itm.domElement.removeChild(val.currentDomElement);
    });
  });

  domTask.forEach((item) => {
    if (item.attribute == "width") {
      item.node.style.width = item.value + "px";
      item.node.setAttribute("data-width", item.value + "px");
    } else {
      item.node.style.display = item.value;
      item.node.setAttribute("data-display", item.value);
    }
  });

  homeostatic.configure();

  homeostatic.main();
  console.log("DOM change handled");
  observer.observe(document.body, observerOptions);
}


export { homeostatic };
