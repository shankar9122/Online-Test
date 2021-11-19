import 'dart:collection';
import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import 'package:flutter/foundation.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:new_flutter/quiz_response.dart';

import 'data.dart';


class QuizList extends StatefulWidget {
  @override
  QuizListHistory createState() => QuizListHistory();
}

class QuizListHistory extends  State<QuizList> {
  bool valuefirst = false;
  bool valuesecond = false;
  bool visible = false;
  bool _value = false;
  var s = new List.filled(1, null, growable: false);
  final List<String> selectedOption = [''];
  List selectedOption1 = [];
  List selectedReview = [];
  List selectedSave = [];
  var val;
  late int selectedRadio;
  int selected = -1;
  late PageController _pageController;
  List _selectedIndexs = [];
  List _selectedRadio = [];
  int page = 1;
  int? groupValue;
  String _currvalue = "null";
  int _answered = 0;
  int? color1;
  int i = 0;
  var _isRadioSelected = false;
  late int index;
  late int index1;
  Map selectedRadioo = new Map();
  Map selectedRadioo1 = new Map();


  String? _groupValue;

  ValueChanged<String?> _valueChangedHandler() {
    return (value) => setState(() => _groupValue = value!);
  }

  @override
  void initState() {
    selectedRadio = 0;
    _pageController = PageController(initialPage: 0, keepPage: true);
    super.initState();
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }


  setSelectedRadio(int val) {
    setState(() {
      selectedRadio = val;
    });
  }

  late int pageViewIndex;

  // final PageController _pgController = PageController(initialPage: selected, keepPage: true);

  @override
  Widget build(BuildContext context) {
    /*
    Future<String> data =  DefaultAssetBundle.of(context).loadString("'assets/beers.json'");
    var jsonResult = jsonDecode(data.toString());*/
    return Scaffold(
        resizeToAvoidBottomInset: true,
        appBar: new AppBar(
          backgroundColor: Color(0xFF08007A),
          centerTitle: true,
          titleTextStyle: new TextStyle(
              fontSize: 15
          ),
          title: new Text("Quiz demo"),
        ),
        body: Container(
            child: FutureBuilder(
                future:
                DefaultAssetBundle.of(context).loadString('assets/quiz.json'),
                builder: (context, snapshot) {
                  var beers = json.decode(snapshot.data.toString());
                  QuizResponse student = new QuizResponse.fromJson(beers);
                  var item = student.questions;
                  return Container(
                      child: PageView.builder(
                        itemCount: item.length,
                        controller: _pageController,
                        pageSnapping: false,
                        onPageChanged: _onPageViewChange,
                        physics: NeverScrollableScrollPhysics(),
                        itemBuilder: (context, pageViewIndex) {
                          if (selected != -1 && selected < item.length) {
                            pageViewIndex = selected;
                          }
                          /*  final _isSelected1=_selectedRadio.contains(selectedRadioo);
                          if(_isSelected1){
                            _selectedRadio = _selectedRadio;
                          }else{
                           // _selectedRadio.add(selectedRadioo);
                          }*/
                          //   PageVieitem[pageViewIndex]w(physics:new NeverScrollableScrollPhysics());
                          var beer = item[pageViewIndex];
                          var answer = item[pageViewIndex];
                          List<String> streetsList = answer.answers;
                          return Container(
                            child: SingleChildScrollView(
                                child: Row(
                                    children: <Widget>[
                                Expanded(
                                  flex: 2,
                                child:
                             Column(
                                  children: <Widget>[
                             Align(
                             alignment: Alignment.centerLeft,
                                 child: Container(
                                     margin: EdgeInsets.fromLTRB(30,30,0,0),
                                     child: Text('Question ' +
                                         (pageViewIndex + 1).toString() +
                                         ':',
                                       style: TextStyle(fontSize: 23),
                                       textAlign: TextAlign.left,)
                                 ),
                             ),

                                    Container(
                                      margin: EdgeInsets.fromLTRB(30,5,30,0),
                                     child: Divider(
                                          color: Colors.black
                                      ),
                                    ),
                                      Container(
                                        margin: EdgeInsets.fromLTRB(30,0,30,0),
                                        height: 200,
                                        child: Column(
                                            mainAxisAlignment: MainAxisAlignment.center,
                                            children: <Widget>[
                                              Align(
                                                alignment: Alignment.centerLeft,
                                                child: Container(
                                                    margin: EdgeInsets.fromLTRB(0,0,0,15),
                                                    child: Text( answer.question,
                                                      style: TextStyle(fontSize: 23),)
                                                ),
                                              ),
                                              ListView.builder(
                                                scrollDirection: Axis.vertical,
                                                shrinkWrap: true,
                                                itemBuilder: (
                                                    BuildContext context,
                                                    index1) {
                                                  return Row(
                                                    mainAxisSize: MainAxisSize
                                                        .min,
                                                    crossAxisAlignment: CrossAxisAlignment
                                                        .center,
                                                    children: <Widget>[
                                                      /* Radio(
                                              value: index,
                                              groupValue:groupValue,
                                              // TRY THIS: Try setting the toggleable value to false and
                                              // see how that changes the behavior of the widget.
                                              toggleable: true,
                                              onChanged: (int? value) {
                                                setState(() {
                                                  groupValue = value;
                                                  _currvalue = groupValue!;
                                                });
                                              }),*/
                                                      Radio(
                                                          value: streetsList[index1],
                                                          groupValue: (selectedRadioo[pageViewIndex] !=
                                                              null)
                                                              ? selectedRadioo[pageViewIndex]
                                                              :
                                                          (selectedRadioo1[pageViewIndex] !=
                                                              null)
                                                              ? selectedRadioo1[pageViewIndex]
                                                              :
                                                          _currvalue,
                                                          toggleable: false,
                                                          onChanged: (value) {
                                                            setState(() {
                                                              _currvalue = value
                                                                  .toString();
                                                              selectedRadioo[pageViewIndex] =
                                                                  _currvalue;

                                                              //  selectedRadioo.update(streetsList[pageViewIndex], (value) => value);

                                                              /*  selectedRadioo[streetsList[index]] =
                                                        value;*/


                                                              /*   selectedRadioo[streetsList[index]] =
                                                        value;*/
                                                              //  _selectedRadio =   selectedRadioo as List<String>;

                                                              //  print(selectedRadioo);
                                                              // selectedRadioo.update(value, (value) => [streetsList[index]]);
                                                              //Adding selected rowName with its Index in a Map tagged "selected"
                                                            });
                                                          }),
                                                      Text(streetsList[index1]),
                                                    ],
                                                  );
                                                },
                                                itemCount: streetsList.length,
                                              ),
                                    ]),),
                                    Container(
                                      margin: EdgeInsets.fromLTRB(30,0,30,0),
                                      child: Divider(
                                          color: Colors.black
                                      ),
                                    ),
                                              /* children: <Widget>[
                                    for (int i = 0; i < streetsList.length; i++)
                                        MyRadioOption<String>(
                                          value: i.toString(),
                                          groupValue: _groupValue,
                                          onChanged: _valueChangedHandler(),
                                          text: streetsList[i]
                                        )
                                  ],*/

                                        Row(
                                          /*  mainAxisAlignment: MainAxisAlignment
                                                .center,*/
                                            //Center Row contents horizontally,
                                          /*  crossAxisAlignment: CrossAxisAlignment
                                                .center,*/
                                            children: [
                                              Container(
                                                height: 30,
                                                  margin: EdgeInsets.fromLTRB(
                                                      30, 40, 0, 0),
                                                  color: Colors.green,
                                                  child: FlatButton(
                                                    height: 30.0,
                                                    minWidth: 100.0,
                                                    onPressed: () =>
                                                    {
                                                      setState(() {
                                                        if (selectedRadioo[pageViewIndex] !=
                                                            null) {
                                                          _currvalue =
                                                          selectedRadioo[pageViewIndex];
                                                        }

                                                        if (_currvalue !=
                                                            "null") {
                                                          if (selectedRadioo[pageViewIndex] ==
                                                              null) {
                                                            _selectedIndexs
                                                                .remove(
                                                                pageViewIndex);
                                                            _answered =
                                                                _answered + 1;
                                                          }
                                                          if (selectedSave
                                                              .contains(
                                                              pageViewIndex)) {
                                                            _selectedIndexs
                                                                .remove(
                                                                selectedOption1);
                                                            _selectedIndexs
                                                                .remove(
                                                                selectedSave);
                                                            selectedOption1
                                                                .remove(
                                                                pageViewIndex);
                                                            selectedReview.remove(
                                                                pageViewIndex);
                                                            selectedSave =
                                                                selectedSave;
                                                            _selectedIndexs
                                                                .remove(
                                                                pageViewIndex);
                                                          } else {
                                                            _selectedIndexs
                                                                .remove(
                                                                selectedOption1);
                                                            _selectedIndexs
                                                                .remove(
                                                                selectedSave);
                                                            selectedReview.remove(
                                                                pageViewIndex);
                                                            selectedSave.add(
                                                                pageViewIndex);
                                                            _selectedIndexs
                                                                .remove(
                                                                pageViewIndex);
                                                            selectedOption1
                                                                .remove(
                                                                pageViewIndex);
                                                          }
                                                          if (selected != -1) {
                                                            selected =
                                                                selected + 1;
                                                          } else {
                                                            selected = -1;
                                                          }
                                                          _currvalue = "null";
                                                          _pageController
                                                              .nextPage(
                                                              duration: Duration(
                                                                  milliseconds: 10),
                                                              curve: Curves
                                                                  .easeIn);
                                                        }
                                                        else {
                                                          Fluttertoast.showToast(
                                                              msg: "Please select answer ",
                                                              toastLength: Toast
                                                                  .LENGTH_SHORT,
                                                              gravity: ToastGravity
                                                                  .CENTER,
                                                              timeInSecForIosWeb: 1,
                                                              backgroundColor: Colors
                                                                  .red,
                                                              textColor: Colors
                                                                  .white,
                                                              fontSize: 16.0
                                                          );
                                                        }
                                                      }),

                                                    },
                                                    child: Text("SAVE & NEXT",
                                                      style: new TextStyle(
                                                        fontSize: 15.0,
                                                        color: Colors.white,
                                                      ),),
                                                  )

                                              ),
                                              Container(
                                                height: 30,
                                                  margin: EdgeInsets.fromLTRB(
                                                      10, 40, 0, 0),
                                                  decoration: BoxDecoration(
                                                      border: Border.all(
                                                        color: Colors.grey,
                                                      ),
                                                      borderRadius: BorderRadius.all(Radius.circular(0))
                                                  ),
                                                  child: FlatButton(
                                                    height: 30.0,
                                                    minWidth: 100.0,
                                                    onPressed: () =>
                                                    {
                                                      setState(() {
                                                        _currvalue = "null";
                                                        selectedRadioo.remove(
                                                            pageViewIndex);
                                                        selectedRadioo1.remove(
                                                            pageViewIndex);
                                                        selectedSave.remove(
                                                            pageViewIndex);
                                                        selectedOption1.remove(
                                                            pageViewIndex);
                                                        selectedReview.remove(
                                                            pageViewIndex);
                                                        _selectedIndexs.add(
                                                            pageViewIndex);
                                                        _answered = _answered - 1;
                                                      }),

                                                    },
                                                    child: Text("CLEAR",
                                                      style: new TextStyle(
                                                        fontSize: 15.0,
                                                        color: Colors.black,
                                                      ),),
                                                  )

                                              ),
                                              Container(
                                                  height: 30,
                                                  margin: EdgeInsets.fromLTRB(
                                                      10, 40, 0, 0),
                                                  color: Color(0xFFEE9E13),
                                                  child: FlatButton(
                                                    height: 30.0,
                                                    minWidth: 100.0,
                                                    onPressed: () =>
                                                    {
                                                      setState(() {
                                                        if (selectedRadioo[pageViewIndex] !=
                                                            null) {
                                                          _currvalue =
                                                          selectedRadioo[pageViewIndex];
                                                        }

                                                        if (_currvalue !=
                                                            "null") {
                                                          if (selectedRadioo[pageViewIndex] ==
                                                              null) {
                                                            _selectedIndexs
                                                                .remove(
                                                                pageViewIndex);
                                                            _answered =
                                                                _answered + 1;
                                                          }
                                                          if (selectedReview
                                                              .contains(
                                                              pageViewIndex)) {
                                                            _selectedIndexs
                                                                .remove(
                                                                selectedOption1);
                                                            _selectedIndexs
                                                                .remove(
                                                                selectedReview);
                                                            selectedOption1
                                                                .remove(
                                                                pageViewIndex);
                                                            selectedSave.remove(
                                                                pageViewIndex);
                                                            selectedReview =
                                                                selectedReview;
                                                            _selectedIndexs
                                                                .remove(
                                                                pageViewIndex);
                                                          } else {
                                                            _selectedIndexs
                                                                .remove(
                                                                selectedOption1);
                                                            _selectedIndexs
                                                                .remove(
                                                                selectedReview);
                                                            selectedReview.add(
                                                                pageViewIndex);
                                                            selectedSave.remove(
                                                                pageViewIndex);
                                                            _selectedIndexs
                                                                .remove(
                                                                pageViewIndex);
                                                            selectedOption1
                                                                .remove(
                                                                pageViewIndex);
                                                          }
                                                          if (selected != -1) {
                                                            selected =
                                                                selected + 1;
                                                          } else {
                                                            selected = -1;
                                                          }
                                                          _currvalue = "null";
                                                          _pageController
                                                              .nextPage(
                                                              duration: Duration(
                                                                  milliseconds: 10),
                                                              curve: Curves
                                                                  .easeIn);
                                                        } else {
                                                          Fluttertoast.showToast(
                                                              msg: "Please select answer ",
                                                              toastLength: Toast
                                                                  .LENGTH_SHORT,
                                                              gravity: ToastGravity
                                                                  .CENTER,
                                                              timeInSecForIosWeb: 1,
                                                              backgroundColor: Colors
                                                                  .red,
                                                              textColor: Colors
                                                                  .white,
                                                              fontSize: 16.0
                                                          );
                                                        }
                                                      }),

                                                    },
                                                    child: Text(
                                                      "SAVE & MARK FOR REVIEW",
                                                      style: new TextStyle(
                                                        fontSize: 15.0,
                                                        color: Colors.white,
                                                      ),),
                                                  )

                                              ),
                                              Container(
                                                  height: 30,
                                                  margin: EdgeInsets.fromLTRB(
                                                      10, 40, 20, 0),
                                                  color: Color(0xFF4454BF),
                                                  child: FlatButton(
                                                    height: 30.0,
                                                    minWidth: 100.0,
                                                    onPressed: () =>
                                                    {
                                                      setState(() {
                                                        if (_selectedIndexs
                                                            .contains(
                                                            pageViewIndex)) {
                                                          _selectedIndexs.remove(
                                                              pageViewIndex);
                                                        }

                                                        if (selectedSave.contains(
                                                            pageViewIndex)) {
                                                          selectedSave.remove(
                                                              pageViewIndex);
                                                        }
                                                        if (selectedReview
                                                            .contains(
                                                            pageViewIndex)) {
                                                          selectedReview.remove(
                                                              pageViewIndex);
                                                        }

                                                        if (selectedOption1
                                                            .contains(
                                                            pageViewIndex)) {
                                                          _selectedIndexs.remove(
                                                              pageViewIndex);
                                                          selectedOption1 =
                                                              selectedOption1;
                                                        } else {
                                                          _selectedIndexs.remove(
                                                              pageViewIndex);
                                                          selectedOption1.add(
                                                              pageViewIndex);
                                                        }

                                                        if (selected != -1) {
                                                          selected = selected + 1;
                                                        } else {
                                                          selected = -1;
                                                        }
                                                      }),
                                                      /*  selectedRadioo[pageViewIndex]=
                          _currvalue,*/
                                                      _pageController.nextPage(
                                                          duration: Duration(
                                                              milliseconds: 10),
                                                          curve: Curves.easeIn)


                                                      /*  selectedRadioo[pageViewIndex]=
                          _currvalue,*/


                                                    },
                                                    child: Text(
                                                      "MARK FOR REVIEW & NEXT",
                                                      style: new TextStyle(
                                                        fontSize: 15.0,
                                                        color: Colors.white,
                                                      ),),
                                                  )

                                              ),
                                            ]),
                                              new Row(
                                                 /* mainAxisAlignment: MainAxisAlignment
                                                      .center,*/
                                                  //Center Row contents horizontally,
                                                  crossAxisAlignment: CrossAxisAlignment
                                                      .center,
                                                  children: [
                                                    Container(
                                                        height: 30,
                                                        margin: EdgeInsets.fromLTRB(
                                                            30, 30, 0, 0),
                                                        decoration: BoxDecoration(
                                                            border: Border.all(
                                                              color: Colors.grey,
                                                            ),
                                                            borderRadius: BorderRadius.all(Radius.circular(0))
                                                        ),
                                                        child: FlatButton(
                                                          height: 30.0,
                                                          minWidth: 100.0,
                                                          onPressed: () =>
                                                          {
                                                            setState(() {
                                                              final _isSelected = _selectedIndexs
                                                                  .contains(
                                                                  pageViewIndex);
                                                              if (_isSelected) {
                                                                _selectedIndexs.remove(
                                                                    selectedRadioo);
                                                                _selectedIndexs.remove(
                                                                    selectedReview);
                                                                _selectedIndexs.remove(
                                                                    selectedOption1);
                                                                _selectedIndexs =
                                                                    _selectedIndexs;
                                                              } else {
                                                                _selectedIndexs.remove(
                                                                    selectedRadioo);
                                                                _selectedIndexs.remove(
                                                                    selectedOption1);
                                                                _selectedIndexs.remove(
                                                                    selectedReview);
                                                                _selectedIndexs.add(
                                                                    pageViewIndex);
                                                              }

                                                              if (selectedOption1
                                                                  .contains(
                                                                  pageViewIndex)) {
                                                                _selectedIndexs.remove(
                                                                    pageViewIndex);
                                                              }
                                                              if (selectedReview
                                                                  .contains(
                                                                  pageViewIndex)) {
                                                                _selectedIndexs.remove(
                                                                    pageViewIndex);
                                                              }
                                                              if (selected != -1) {
                                                                selected = selected - 1;
                                                              } else {
                                                                selected = -1;
                                                              }
                                                              if (pageViewIndex > 0) {
                                                                _pageController
                                                                    .previousPage(
                                                                    duration: Duration(
                                                                        milliseconds: 10),
                                                                    curve: Curves
                                                                        .easeIn);
                                                              }
                                                            }),

                                                          },
                                                          child: Text("<< Back",
                                                            style: new TextStyle(
                                                              fontSize: 15.0,
                                                              color: Colors.grey,
                                                            ),),
                                                        )

                                                    ),
                                                    Container(
                                                      height: 30,
                                                        margin: EdgeInsets.fromLTRB(
                                                            0, 30, 0, 0),
                                                        decoration: BoxDecoration(
                                                            border: Border.all(
                                                              color: Colors.grey,
                                                            ),
                                                            borderRadius: BorderRadius.all(Radius.circular(0))
                                                        ),
                                                        child: FlatButton(
                                                          height: 30.0,
                                                          minWidth: 100.0,
                                                          onPressed: () =>
                                                          {
                                                            setState(() {
                                                              final _isSelected = _selectedIndexs
                                                                  .contains(
                                                                  pageViewIndex);
                                                              if (_isSelected) {
                                                                _selectedIndexs =
                                                                    _selectedIndexs;
                                                              } else {
                                                                _selectedIndexs.add(
                                                                    pageViewIndex);
                                                              }
                                                              if (selectedOption1
                                                                  .contains(
                                                                  pageViewIndex)) {
                                                                _selectedIndexs.remove(
                                                                    pageViewIndex);
                                                              }
                                                              if (selectedReview
                                                                  .contains(
                                                                  pageViewIndex)) {
                                                                _selectedIndexs.remove(
                                                                    pageViewIndex);
                                                              }
                                                              _currvalue = "null";
                                                              if (selected != -1) {
                                                                selected = selected + 1;
                                                              } else {
                                                                selected = -1;
                                                              }
                                                            }),
                                                            /*  selectedRadioo[pageViewIndex]=
                          _currvalue,*/
                                                            _pageController.nextPage(
                                                                duration: Duration(
                                                                    milliseconds: 10),
                                                                curve: Curves.easeIn)
                                                          },
                                                          child: Text("Next >>",
                                                            style: new TextStyle(
                                                              fontSize: 15.0,
                                                              color: Colors.black87,
                                                            ),),
                                                        )

                                                    ),

                                      ],
                                  ),

                                      ]),),


                                      /* MyRadioOption<String>(
                                    value: '2',
                                    groupValue: _groupValue,
                                    onChanged: _valueChangedHandler(),
                                    text: streetsList[1],
                                  ),
                              MyRadioOption<String>(
                                value: '3',
                                groupValue: _groupValue,
                                onChanged: _valueChangedHandler(),
                                text: streetsList[2],
                              ),
                              MyRadioOption<String>(
                                value: '4',
                                groupValue: _groupValue,
                                onChanged: _valueChangedHandler(),
                                text: streetsList[3],
                              ),*/
                                    Expanded(
                                        flex: 1,
                                    child:Container(

                            child: Column(
                                mainAxisAlignment: MainAxisAlignment
                                    .center,
                                  children: <Widget>[

                            Container(
                              height: 200.0,
                              margin: EdgeInsets.only(right: 20),
                              decoration: BoxDecoration(
                                  border: Border.all(
                                    color: Colors.black,
                                  ),
                                  borderRadius: BorderRadius.all(Radius.circular(0))
                              ),
                                child: Column(
                                    mainAxisAlignment: MainAxisAlignment
                                        .center,
                            children: <Widget>[
                                     Row(
                                          mainAxisAlignment: MainAxisAlignment
                                              .center,
                                          //Center Row contents horizontally,
                                          crossAxisAlignment: CrossAxisAlignment
                                              .center,
                                          children: [
                                            Expanded(
                                              flex:1,
                                               child: Row(
                                                  mainAxisAlignment: MainAxisAlignment
                                                      .center,
                                                  //Center Row contents horizontally,
                                                  crossAxisAlignment: CrossAxisAlignment
                                                      .center,
                                                  children: [
                                               Visibility(
                                               visible: (((item.length) -
                                                   (_selectedIndexs.length +
                                                       selectedOption1
                                                           .length +
                                                       selectedReview
                                                           .length +
                                                       selectedSave.length))>0) ? true:true,
                                    child: Container(
                                      alignment: Alignment.center,
                                        child: Text(((item.length) -
                                            (_selectedIndexs.length +
                                                selectedOption1
                                                    .length +
                                                selectedReview
                                                    .length +
                                                selectedSave.length))
                                            .toString() ,
                                          style: new TextStyle(
                                            fontSize: 15.0,
                                            color: Colors.white,
                                          ),),
                                                   height: 30,
                                                   width: 30,
                                                   decoration: BoxDecoration(
                                                       color: Colors.grey,
                                                       border: Border.all(
                                                         color: Colors.grey,
                                                       ),
                                                       borderRadius: BorderRadius.all(Radius.circular(0))
                                                   ))),
                                          Container(
                                              height: 30,
                                                margin: EdgeInsets.fromLTRB(
                                                    0, 0, 0, 0),
                                             //   color: Color(0xFF08007A),
                                                child: FlatButton(
                                                  height: 30.0,
                                                  minWidth: 100.0,
                                                  onPressed: () =>
                                                  {
                                                    setState(() {
                                                      if (pageViewIndex > 0) {
                                                        _pageController
                                                            .previousPage(
                                                            duration: Duration(
                                                                milliseconds: 10),
                                                            curve: Curves
                                                                .easeIn);
                                                      }
                                                    }),

                                                  },
                                                  child: Text(
                                                      " Not Visited",
                                                    style: new TextStyle(
                                                      fontSize: 15.0,
                                                      color: Colors.black,
                                                    ),),
                                                )

                                            ),])),
                                            Expanded(
                                              flex: 1,
                                                child:  Row(
                                                    mainAxisAlignment: MainAxisAlignment
                                                        .center,
                                                    //Center Row contents horizontally,
                                                    crossAxisAlignment: CrossAxisAlignment
                                                        .center,
                                                    children: [
                                                Visibility(
                                                visible: (_selectedIndexs.length>0) ? true:true,
                                                child: Container(
                                                    alignment: Alignment.center,
                                                    child: Text(
                                                      (_selectedIndexs.length)
                                                          .toString(),
                                                      style: new TextStyle(
                                                        fontSize: 15.0,
                                                        color: Colors.white,
                                                      ),),
                                                          height: 30,
                                                          width: 30,
                                                          decoration: BoxDecoration(
                                                              color: Colors.red,
                                                              border: Border.all(
                                                                color: Colors.grey,
                                                              ),
                                                              borderRadius: BorderRadius.all(Radius.circular(0))
                                                          ))),
                                                      Container(
                                                margin: EdgeInsets.fromLTRB(
                                                    10, 0, 0, 0),
                                           //     color: Color(0xFF08007A),
                                                child: FlatButton(
                                                  height: 30.0,
                                                  minWidth: 100.0,
                                                  onPressed: () =>
                                                  {
                                                    setState(() {

                                                    }),

                                                  },
                                                  child: Text(
                                                    " Not \n Answered",
                                                    style: new TextStyle(
                                                      fontSize: 15.0,
                                                      color: Colors.black,
                                                    ),),
                                                )

                                            ),]))
                                          ]),
                                      new Row(
                                          mainAxisAlignment: MainAxisAlignment
                                              .center,
                                          //Center Row contents horizontally,
                                          crossAxisAlignment: CrossAxisAlignment
                                              .center,
                                          children: [
                                          Expanded(
                                          flex: 1,
                                          child:  Row(
                                              mainAxisAlignment: MainAxisAlignment
                                                  .center,
                                              //Center Row contents horizontally,
                                              crossAxisAlignment: CrossAxisAlignment
                                                  .center,
                                              children: [
                                          Visibility(
                                          visible: ( selectedSave.length>0) ? true:true,
                                          child: Container(
                                              alignment: Alignment.center,
                                              child: Text(
                                                selectedSave.length
                                                    .toString(),
                                                style: new TextStyle(
                                                  fontSize: 15.0,
                                                  color: Colors.white,
                                                ),),
                                                    height: 30,
                                                    width: 30,
                                                    decoration: BoxDecoration(
                                                        color: Colors.green,
                                                        border: Border.all(
                                                          color: Colors.grey,
                                                        ),
                                                        borderRadius: BorderRadius.all(Radius.circular(0))
                                                    ))),
                                                Container(
                                                height: 30,
                                                margin: EdgeInsets.fromLTRB(
                                                    0, 10, 0, 0),
                                             //   color: Color(0xFF08007A),
                                                child: FlatButton(
                                                  height: 30.0,
                                                  minWidth: 100.0,
                                                  onPressed: () =>
                                                  {
                                                    setState(() {

                                                    }),

                                                  },
                                                  child: Text(
                                                        " Answered",
                                                    style: new TextStyle(
                                                      fontSize: 15.0,
                                                      color: Colors.black,
                                                    ),),
                                                )

                                            )])),
                              Expanded(
                                  flex: 1,
                                  child:  Row(
                                      mainAxisAlignment: MainAxisAlignment
                                          .center,
                                      //Center Row contents horizontally,
                                      crossAxisAlignment: CrossAxisAlignment
                                          .center,
                                      children: [
                                  Visibility(
                                  visible: (selectedOption1.length>0) ? true:true,
                                  child: Container(
                                      alignment: Alignment.center,
                                    child: Text(
                                        selectedOption1.length
                                            .toString(),
                                        style: new TextStyle(
                                          fontSize: 15.0,
                                          color: Colors.white,
                                        ),),
                                            height: 30,
                                            width: 30,
                                            decoration: BoxDecoration(
                                                color: Color(0xFF4454BF),
                                                border: Border.all(
                                                  color: Colors.grey,
                                                ),
                                                borderRadius: BorderRadius.all(Radius.circular(0))
                                            ))),
                                        Container(
                                                margin: EdgeInsets.fromLTRB(
                                                    10, 10, 0, 0),
                                            //    color: Color(0xFF08007A),
                                                child: FlatButton(
                                                  height: 30.0,
                                                  minWidth: 100.0,
                                                  onPressed: () =>
                                                  {
                                                    setState(() {}),

                                                  },
                                                  child: Text(
                                                        ' Marked for \n Review ',
                                                    style: new TextStyle(
                                                      fontSize: 15.0,
                                                      color: Colors.black,
                                                    ),),
                                                )

                                            )])),
                                          ]),
                                      new Row(
                                          mainAxisAlignment: MainAxisAlignment
                                              .center,
                                          //Center Row contents horizontally,
                                          crossAxisAlignment: CrossAxisAlignment
                                              .center,
                                          children: [
                                            Visibility(
                                                visible: (selectedReview.length>0) ? true:true,
                                                child:
                                            Container(
                                                alignment: Alignment.center,
                                                child: Text(
                                                  selectedReview.length
                                                      .toString() ,
                                                  style: new TextStyle(
                                                    fontSize: 15.0,
                                                    color: Colors.white,
                                                  ),),
                                                height: 30,
                                                width: 30,
                                                decoration: BoxDecoration(
                                                    color: Color(0xFFEE9E13),
                                                    border: Border.all(
                                                      color: Colors.grey,
                                                    ),
                                                    borderRadius: BorderRadius.all(Radius.circular(0))
                                                ))),
                                            Container(
                                              height:60,
                                                margin: EdgeInsets.fromLTRB(
                                                    10, 10, 10, 0),
                                            //    color: Color(0xFF08007A),
                                                child: FlatButton(
                                                  height: 30.0,
                                                  minWidth: 100.0,
                                                  onPressed: () =>
                                                  {
                                                    setState(() {
                                                      if (pageViewIndex > 0) {
                                                        _pageController
                                                            .previousPage(
                                                            duration: Duration(
                                                                milliseconds: 10),
                                                            curve: Curves
                                                                .easeIn);
                                                      }
                                                    }),

                                                  },
                                                  child: Text(
                                                        " Answered & Marked for Review \n (will be considered for evaluation)",
                                                    maxLines: 2,
                                                    overflow: TextOverflow.fade,
                                                    style: new TextStyle(
                                                      fontSize: 15.0,
                                                      color: Colors.black,
                                                    ),),
                                                )

                                            ),
                                          ]),
                                  ]),),

                                      Container(
                                        margin: EdgeInsets.fromLTRB(0,30,30,0),
                                        child: GridView.count(
                                          crossAxisCount: 6,
                                          crossAxisSpacing: 1.0,
                                          mainAxisSpacing: 1.0,
                                          shrinkWrap: true,
                                          children: List.generate(
                                            item.length, (index) {
                                            final _isSelected = _selectedIndexs
                                                .contains(index);

                                            return InkWell(
                                              onTap: () {
                                                setState(() {
                                                  if (_isSelected) {
                                                    _selectedIndexs.remove(
                                                        selectedRadioo);
                                                    _selectedIndexs.remove(
                                                        selectedOption1);
                                                    _selectedIndexs.remove(
                                                        selectedReview);
                                                    _selectedIndexs =
                                                        _selectedIndexs;
                                                  } else {
                                                    _selectedIndexs.remove(
                                                        selectedRadioo);
                                                    _selectedIndexs.add(index);
                                                    _selectedIndexs.remove(
                                                        selectedRadioo);
                                                    //   _selectedIndexs = _selectedIndexs;

                                                  }
                                                  if (selectedOption1.contains(
                                                      index)) {
                                                    _selectedIndexs.remove(
                                                        index);
                                                  }
                                                  if (selectedSave.contains(
                                                      index)) {
                                                    _selectedIndexs.remove(
                                                        index);
                                                  }
                                                  if (selectedReview.contains(
                                                      index)) {
                                                    _selectedIndexs.remove(
                                                        index);
                                                  }
                                                  if (selected != index) {
                                                    selected = index;
                                                  } else {
                                                    selected = index;
                                                    //  selected = -1 ;
                                                  }
                                                });
                                              },
                                              child: Container(
                                                margin: EdgeInsets.only(top: 3),
                                               alignment: Alignment.center,
                                                child: Text(
                                                  (index + 1).toString(),
                                                  style: new TextStyle(
                                                    fontSize: 15.0,
                                                    color: Colors.black,
                                                  ),
                                                  textAlign: TextAlign.center,),
                                                decoration: BoxDecoration(
                                                  color: (selectedSave.contains(
                                                      index)) ? Colors.green
                                                      : (_isSelected) ? Colors
                                                      .red :
                                                  (selectedOption1.contains(
                                                      index)) ? Color(0xFF4454BF) :
                                                  (selectedReview.contains(
                                                      index)) ? Color(0xFFEE9E13) :
                                                  Colors.grey,
                                                  borderRadius:
                                                  BorderRadius.all(Radius.circular(5)),
                                                ),
                                              ),
                                            );
                                          },),
                                        ),
                                      ),
                                  ])),

                                    ),
                          ])));
                          //  color: position % 2 == 0 ? Colors.pink : Colors.cyan,

                        },
                      )
                  );
                })));
  }

  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    throw UnimplementedError();
  }

  void _onPageViewChange(int page1) {
    print("Current Page: " + page1.toString());
    page = page1;

    Fluttertoast.showToast(
        msg: "Current Page: " + page1.toString(),
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.CENTER,
        timeInSecForIosWeb: 1,
        backgroundColor: Colors.red,
        textColor: Colors.white,
        fontSize: 16.0
    );


    int previousPage = page1;
    if (page1 != 0)
      previousPage--;
    else
      previousPage = 2;
    print("Previous page: $previousPage");
   