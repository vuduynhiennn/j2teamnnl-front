!(function (t) {
    t.fn.ClassyLoader = function (s) {
        s = t.extend(
            {},
            {
                width: 200,
                height: 200,
                animate: !0,
                displayOnLoad: !0,
                percentage: 100,
                speed: 1,
                roundedLine: !1,
                showRemaining: !0,
                fontFamily: "Helvetica",
                fontSize: "50px",
                showText: !0,
                diameter: 80,
                fontColor: "rgba(25, 25, 25, 0.6)",
                lineColor: "rgba(55, 55, 55, 1)",
                remainingLineColor: "rgba(55, 55, 55, 0.4)",
                lineWidth: 5,
                start: "left",
            },
            s
        );
        var c = t(this);
        return (
            (this.draw = function (t) {
                void 0 !== t && (s.percentage = t);
                var n = c[0].getContext("2d"),
                    i = c.width() / 2,
                    a = c.height() / 2,
                    r = 0,
                    o = 0;
                n.scale(1, 1),
                    (n.lineWidth = s.lineWidth),
                    (n.strokeStyle = s.lineColour),
                    setTimeout(function t() {
                        var e = (e = (((Math.PI / 180) * 360) / 100) * (r + 1)) || (((Math.PI / 180) * 360) / 100) * (r + 1);
                        switch (
                            (n.clearRect(0, 0, c.width(), c.height()),
                            !0 === s.showRemaining && (n.beginPath(), (n.strokeStyle = s.remainingLineColor), n.arc(i, a, s.diameter, 0, 360), n.stroke(), n.closePath()),
                            (n.strokeStyle = s.lineColor),
                            n.beginPath(),
                            (n.lineCap = !0 === s.roundedLine ? "round" : "butt"),
                            s.start)
                        ) {
                            case "top":
                                o = 1.5 * Math.PI;
                                break;
                            case "bottom":
                                o = 0.5 * Math.PI;
                                break;
                            case "right":
                                o = +Math.PI;
                                break;
                            default:
                                o = 0;
                        }
                        n.arc(i, a, s.diameter, o, e + o),
                            n.stroke(),
                            n.closePath(),
                            !0 === s.showText && ((n.fillStyle = s.fontColor), (n.font = s.fontSize + " " + s.fontFamily), (n.textAlign = "center"), (n.textBaseline = "middle"), n.fillText(r + 1 + "%", i, a)),
                            (r += 1) < s.percentage && setTimeout(t, s.speed);
                    }, s.speed);
            }),
            (this.setPercent = function (t) {
                return (s.percentage = t), this;
            }),
            (this.getPercent = function () {
                return s.percentage;
            }),
            (this.show = function () {
                var t = c[0].getContext("2d"),
                    e = c.width() / 2,
                    n = c.height() / 2;
                t.scale(1, 1),
                    (t.lineWidth = s.lineWidth),
                    (t.strokeStyle = s.lineColour),
                    t.clearRect(0, 0, c.width(), c.height()),
                    (t.strokeStyle = s.lineColor),
                    t.beginPath(),
                    t.arc(e, n, s.diameter, 0, (Math.PI / 180) * (s.percentage / 100) * 360),
                    t.stroke(),
                    t.closePath(),
                    !0 === s.showText && ((t.fillStyle = s.fontColor), (t.font = s.fontSize + " " + s.font), (t.textAlign = "center"), (t.textBaseline = "middle"), t.fillText(s.percentage + "%", e, n)),
                    !0 === s.showRemaining && (t.beginPath(), (t.strokeStyle = s.remainingLineColor), t.arc(e, n, s.diameter, 0, 360), t.stroke(), t.closePath());
            }),
            (this.__constructor = function () {
                return t(this).attr("width", s.width), t(this).attr("height", s.height), !0 === s.displayOnLoad && (!0 === s.animate ? this.draw() : this.show()), this;
            }),
            this.__constructor()
        );
    };
})(jQuery),
    (function (w) {
        function onDailyLimited() {
            $("#btn-done").remove(),
                $("#count_prc").parent().addClass("alert-error"),
                $("#std_btn").html(
                    '<p  style="font-size: 18px; line-height: 30px;">Bạn đã làm hết số câu hỏi miễn phí trong hôm nay, vui lòng quay lại thực hành vào ngày mai hoặc nâng cấp lên tài khoản VIP của OLM để tiếp tục thực hành <a class="btn btn-danger" href="/?l=payment.buy">Mua tài khoản VIP</a></p>'
                );
        }
        function onGuestLimited() {
            $("#btn-done").remove(),
                $("#count_prc").parent().addClass("alert-error"),
                $("#std_btn").html('<p  style="font-size: 18px; line-height: 30px;">Để tiếp tục luyện tập, mời bạn đăng nhập <a class="btn btn-danger" href="/index.php?l=user.login">Đăng nhập</a></p>');
        }
        function olm_set_item(t, e) {
            localStorage.setItem(t, e);
        }
        function olm_get_item(t, e) {
            t = localStorage.getItem(t);
            return t || e;
        }
        function olm_clear_data(t) {
            for (var e = (e = parseInt(olm_get_item("stack.counting_" + t, 0))) || 0, n = 0; n < e; n++) localStorage.removeItem("practice_data_" + t + "_" + n);
            olm_set_item("stack.counting_" + t, 0);
        }
        var isReportMode = !1,
            qcode = "",
            skillImage = function () {
                this.appendTo = function (t, e, n) {
                    n = n || "";
                    for (var i = 0; i < e; i++) document.getElementById(t).innerHTML += "<img src='" + this.url + "' " + n + " />";
                };
            },
            _text = ["Tuyệt vời !", "Đúng rồi !", "Xuất sắc !", "Rất tốt !", "Chính xác !", "Yeah !!!", "Giỏi quá !", "Hay quá !", "Khá lắm !"],
            CONNECTION_ERROR = "Chúng tôi không kết nối được tới máy chủ OnlineMath vào lúc này, hãy kiểm tra kết nối Internet của bạn hoặc thử lại !",
            CANNOT_LOAD_SCRIPT = "Có lỗi khi tải kỹ năng này. Hãy thử tải lại trang !",
            _current_index = 0,
            CF = function () {},
            audioList = [],
            current_q = -1,
            previous_q = 0,
            feedback_q = 0,
            indexList = -1,
            list_quiz = [],
            matrix_q = [],
            matrix_ans = [],
            matrix_result = [],
            total_score = 0,
            paramsList = [],
            resultList = [],
            timeList = [],
            quizList = [],
            data_log = [],
            total_time = 0,
            times = 3,
            q_remain = 0,
            count_q = 0,
            total_q = 0,
            set_lang = "vi",
            Lang_play = [];
        (Lang_play.vi = {
            good: ["Tuyệt vời!", "Đúng rồi!", "Xuất sắc!", "Rất tốt!", "Chính xác!", "Yeah!", "Giỏi quá!", "Hay quá!", "Tốt lắm!"],
            cannot_load_script: "Có lỗi khi tải kỹ năng này. Hãy thử tải lại trang !",
            lesson_is_creating: "Bài học này đang được soạn nội dung",
            lesson_is_done: "Bạn đã hoàn thành bài học này",
            number_question: "Số câu hỏi",
            number_correct: "Số câu trả lời đúng",
            number_wrong: "Số câu sai",
            correct_rate: "Tỷ lệ đúng",
            replay: "Luyện tập lại!",
            history: "Lịch sử luyện tập",
            true_ans: "Đáp án đúng:",
            self_check: "Tự luận",
            continue_play: "Tiếp tục làm bài !",
            go_back: "Trở lại",
            report_err: "Báo lỗi",
            report: "Báo lỗi câu hỏi này và nhận thưởng VIP",
            summaries: "Lý thuyết",
            flashcard: "Flashcard",
            not_answer: "Chưa trả lời",
            correct: "Đúng",
            wrong: "Sai",
            completed: "Hoàn thành",
            your_play: "Câu hỏi và câu trả lời của bạn:",
            correct_ans: "Đáp án đúng",
            hint: "Ấn phím mũi tên trái / phải trên bàn phím để chuyển sang câu tiếp theo.",
            not_play: "Bạn chưa trả lời câu hỏi này, nếu bạn ấn nộp bài thì câu hỏi này sẽ được tính là bạn làm sai !",
            summit_quiz: "Nộp bài",
            delete_record: "Bạn có muốn xoá dữ liệu ở dạng bài này và thực hành lại?",
            deleted: "Đã xoá dữ liệu thực hành ở bài học này",
            error_database: "Lỗi cập nhật dữ liệu",
            error_connect_server: "Lỗi kết nối với máy chủ",
        }),
            (Lang_play.en = {
                good: ["Correct!", "Fantastic!", "Good work!", "Well done!", "Good job!", "Great!", "Wonderful!", "Superb!", "Brilliant!", "Excellent!", "Awesome!", "Great work!", "Great job!", "Nice work!", "That’s right!", "You got it!"],
                cannot_Load_script: "Error when load this page. Please reload this page !",
                lesson_is_creating: "This lesson is being edited",
                lesson_is_done: "You have completed this lesson",
                number_question: "Number of questions",
                number_correct: "Number of correct answers",
                number_wrong: "Number of wrong answers",
                correct_rate: "Correct rate",
                replay: "Practice again!",
                history: "History of practice",
                true_ans: "Correct answer:",
                self_check: "Self check",
                continue_play: "Continue",
                go_back: "Go back",
                report_err: "Report",
                report: "Report this question and get VIP privileges",
                summaries: "Summary",
                flashcard: "Flashcard",
                not_answer: "Unanswered",
                correct: "Correct",
                wrong: "Wrong",
                completed: "Completed",
                your_play: "Your question and answer:",
                correct_ans: "Correct answer",
                hint: "Press the left / right arrow keys on the keyboard to move on to the next question.",
                not_play: "You did not finish the question. Do you want to go back to the question?",
                summit_quiz: "Submit",
                delete_record: "Your practice in this lesson will be deleted if you press OK. Do you want to practice again?",
                deleted: "Your practice in this lesson was deleted.",
                error_database: "Error updating data",
                error_connect_server: "Error connecting to server",
            });
        var p_lang = !1;
        (CF.user = { name: "Bạn", id: 0, image: "/images/avt/default/d0.png" }),
            (CF.createAudio = function () {
                function t() {
                    for (var t = 0; t < audioList.length; t++) soundManager.createSound(audioList[t]);
                }
                return (
                    3 != soundManager.readyState
                        ? soundManager.onready(function () {
                              t();
                          })
                        : t(),
                    ""
                );
            }),
            (CF.destroyAudio = function () {
                for (var t = 0; t < audioList.length; t++) soundManager.destroySound(audioList[t].id);
            }),
            (CF.audioText = function (t) {
                for (var e = /\(|\)|\+|\-|\*|\/|\.|,|\?|\'|\"|\?|\!|-|=|\>|\<|\[|\]|\s|:/g, n = CF.baseUrl() + "/skill/loadaudio.php?q=", i = t.split("_"), a = i.join(" ").replace(/#/g, ""), r = [], o = 0; o < i.length; o++) {
                    var s = i[o],
                        s = CF.viFilter(s).replace(e, "");
                    r.push(s);
                }
                t = r.join("+").toLowerCase();
                n += encodeURIComponent(t) + "&d=" + CF._idQuestion;
                t = r.join("_");
                return audioList.push({ id: t, url: n }), "<h2 class='audiotext'> <span class='audiobtn' onclick='return soundManager.play(\"" + t + "\")'></span> <span class='audiocont'>" + a + "</span></h2>";
            }),
            (CF.audioText2 = function (t) {
                for (
                    var e = /\(|\)|\+|\-|\*|\/|\.|,|\?|\'|\"|\?|\!|-|=|\>|\<|\[|\]|\s|:/g, n = CF.baseUrl() + "skill/loadaudio2.php?q=", i = t.split("_"), a = (a = i.join(" ").replace(/#/g, "")).replace(/@/g, ""), r = [], o = 0;
                    o < i.length;
                    o++
                ) {
                    var s = i[o],
                        s = CF.viFilter(s).replace(e, "");
                    r.push(s);
                }
                t = r.join("+").toLowerCase();
                n += encodeURIComponent(t) + "&d=" + CF._idQuestion;
                t = r.join("_");
                return audioList.push({ id: t, url: n }), "<h2 class='audiotext'> <span class='audiobtn' onclick='return soundManager.play(\"" + t + "\")'></span> <span class='audiocont'>" + a + "</span></h2>";
            }),
            (CF.viFilter = function (t) {
                var e = "àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ";
                e += e.toUpperCase();
                var n = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd";
                n += n.toUpperCase();
                for (var i = 0, a = e.length; i < a; i++) t = t.replace(new RegExp(e.charAt(i), "g"), n.charAt(i));
                return t;
            }),
            (CF.randNext = function (t, e) {
                (e -= t), (e = Math.round(Math.random() * e));
                return parseInt(t + e);
            }),
            (CF.random = function () {
                return Math.random();
            });
        var timer = new Object();
        (timer._time = 0), (timer._time_count = !1), (timer._time_interval = !1);
        var Results = [],
            Scores = [],
            Answered = [],
            c_answered = 0,
            c_true_ans = 0,
            $question = !1,
            $questionStatic = !1;
        function RandNext(t, e) {
            (e -= t), (e = Math.round(Math.random() * e));
            return parseInt(t + e);
        }
        function Alert(t, e) {
            $("#std_btn").hide(), $question.html("").hide();
            var n = p_lang.good[RandNext(0, p_lang.good.length - 1)];
            $("#good").html(n),
                $("#verygood")
                    .fadeIn(500)
                    .delay(800)
                    .fadeOut(800, function () {
                        return $question.show(), $("#std_btn").show(), !!e && e.call();
                    });
        }
        function OnDone() {
            $("#std_btn").hide();
            var t = resultList.length;
            0 == t && ((t = CF.count_problems), (c_true_ans = CF.correct));
            var e = Math.round((100 * c_true_ans) / t);
            0 == matrix_q.length && 0 == total_score
                ? $question.html("<h2>Bài học này đang được soạn nội dung!</h2>")
                : ($question.html(
                      "<h2>" +
                          Cf.data.say +
                          " đã hoàn thành bài học này</h2><div class='static-overview'><p>Số câu hỏi: <strong>" +
                          t +
                          "</strong></p><p>Số câu trả lời đúng: <strong>" +
                          c_true_ans +
                          "</strong></p><p>Tỷ lệ đúng: <strong>" +
                          e +
                          " %</strong></p><button class = 'btn btn-primary' onclick = 'CFrame.deleteRec();'>Luyện tập lại!</button><button class = 'btn btn-default' onclick = 'CFrame.loadHistory();' style = 'margin-left: 5px;'>Lịch sử luyện tập</button><a class = 'btn btn-default' href = '" +
                          CF.data.next_lesson_url +
                          "' style = 'margin-left: 5px;'>Bài học tiếp theo</a></div>"
                  ),
                  setTimeout(function () {
                      CF.soundComplete.play(), $("#menu-lesson").show();
                  }, 500));
        }
        function onWrongAnswer(t) {
            $("#btn-done").hide(),
                $("#ignore").hide(),
                $("#btn-action").css("display", "inline-block"),
                void 0 === RunNow.isCode
                    ? ((param = paramsList[indexList].qparams),
                      $question.append(
                          "<div id = 'u_correct_h'><h3 class = 'review'>" + p_lang.true_ans + "</h3><div id = 'u_correct'></div></div><div id = 'u_exp_h'><h3 class = 'review'>" + p_lang.hint + "</h3><div id = 'u_exp'></div></div>"
                      ),
                      RunNow.getContent(param, "u_correct"),
                      RunNow.getExp(param, "u_exp"))
                    : ($question.append("<div id = 'u_correct_h'>"),
                      -1 === [1, 21].indexOf(RunNow.idq()) && ($question.append("<h3 class = 'review'>" + p_lang.true_ans + "</h3><div id = 'u_correct'></div></div>"), RunNow.makeCorrectAns($("#u_correct"))),
                      "" != RunNow.exp && null != RunNow.exp ? ($question.append("<div id = 'u_exp_h'><div id = 'u_exp'></div></div>"), RunNow.getExp($("#u_exp")), $("#btn-exp").show()) : $("#btn-exp").hide()),
                $(".qholder input").attr("disabled", "disabled"),
                $("#quizz .qselect").each(function (t, e) {
                    e.onclick = function () {};
                });
        }
        function reportQuestion(position, quiz) {
            (timer._time = timeList[position] - 1), (feedback_q = quiz), (current_q = previous_q), $("#btn-done").hide(), $("#btn-action").css("display", "inline-block"), $("#btn-action>button").hide();
            var i = matrix_q[quiz],
                res = resultList[position],
                id_quiz = CFrame._list[i].id_script,
                param = paramsList[position].qparams,
                ans = paramsList[position].aparams,
                scriptName,
                quiz,
                runHistory;
            0 < quizList[position] && (id_quiz = quizList[position]),
                $question.html("<div id = 'u_result'></div>"),
                2 == res
                    ? $question.find("#u_result").html(" <span class = 'noans'> " + p_lang.not_answer + "</span>")
                    : 1 == res
                    ? $question.find("#u_result").html(" <span class = 'right'> " + p_lang.correct + "  </span>")
                    : $question.find("#u_result").html(" <span class = 'wrong'> " + p_lang.wrong + "</span>"),
                CF.teacher && $question.append("<p style = 'color: #0044cc;'>ID: " + id_quiz + "</p>"),
                1 == CFrame._list[i].type
                    ? ($question.append(
                          "<h3 class = 'review'>" +
                              p_lang.your_play +
                              "</h3><div id = 'u_quiz'></div><h3 class = 'review'>Câu trả lời của " +
                              ("Bạn" == Cf.data.say ? "bạn" : Cf.data.say) +
                              ":</h3><div id = 'u_ans'></div><h3 class = 'review'>" +
                              p_lang.correct_ans +
                              "</h3><div id = 'u_correct'></div><h3 class = 'review'>" +
                              p_lang.hint +
                              "</h3><div id = 'u_exp'></div>"
                      ),
                      (_current_index = position),
                      (scriptName = "script" + id_quiz),
                      (quiz = eval("new " + scriptName + ";")),
                      quiz.makeQuestion(param, "u_quiz"),
                      quiz.getUA(param, ans, "u_ans"),
                      quiz.getContent(param, "u_correct"),
                      quiz.getExp(param, "u_exp"),
                      CF.teacher && $("#admin-edit").attr("href", "https://olm.vn/adm/?l=math.edittmpscript&id=" + id_quiz))
                    : (0 == param && (param = void 0),
                      ans instanceof Array && (ans = JSON.stringify(ans)),
                      (runHistory = detectQuestion(list_quiz["n" + id_quiz].content, { id_quiz: id_quiz, answer: ans, result: res, params: param }, { lang: set_lang, cdn: "https://olm.vn/" })),
                      $question.append("<h3 class = 'review'>Câu hỏi và câu trả lời của " + ("Bạn" == Cf.data.say ? "bạn" : Cf.data.say) + ":</h3><div id = 'u_quiz'></div>"),
                      runHistory.makeQuestionH($("#u_quiz")),
                      -1 === [1, 21].indexOf(runHistory.idq()) && ($question.append("<h3 class = 'review'>" + p_lang.correct_ans + "</h3><div id = 'u_correct'></div>"), runHistory.makeCorrectAns($("#u_correct"))),
                      "" != runHistory.exp && null != runHistory.exp && ($question.append("<div id = 'u_exp'></div>"), runHistory.getExp($("#u_exp"))),
                      CF.teacher && $("#admin-edit").attr("href", "https://olm.vn/adm/?l=math.display.editquiz&id=" + id_quiz)),
                CF.timeshow(timeList[position]),
                $question.append("<span style='font-size: 16px; color: #999999;'>Ấn phím mũi tên trái / phải trên bàn phím để chuyển sang câu tiếp theo.</span></br>"),
                total_score < 100 && $("#btn-action>.btn-primary").show(),
                $(".qholder input").attr("disabled", "disabled");
        }
        function checkQuestion(t) {
            return t;
        }
        function submitQuestion(t) {
            console.log("submitQuestion", t);
            var e = checkQuestion(t);
            if (2 != (matrix_result[indexList] = e)) return 1 == e ? (saveAnswer(t), CF.soundCorrect.play(), Alert("Bạn đã trả lời đúng !", nextQuestion)) : 3 != e && (saveAnswer(t), CF.soundWrong.play(), onWrongAnswer(t));
            $("#modal-content").html(
                "<h4>Bạn chưa trả lời câu hỏi này, nếu bạn ấn nộp bài thì câu hỏi này sẽ được tính là bạn chưa làm !</h4> <button class='btn btn-danger' id='btn-continue' type='button'>Nộp bài !</button> <button id='btn-cancel' data-dismiss='modal' class='btn btn-primary' type='button'>Tiếp tục làm bài</button>"
            ),
                $("#form").modal("show"),
                (CFrame.id("btn-continue").onclick = function () {
                    return saveAnswer(t), $("#modal-content").html(""), $("#form").modal("hide"), onWrongAnswer(t);
                }),
                $("#btn-cancel").click(function () {
                    $("#btn-done")
                        .off("click")
                        .on("click", function () {
                            submitQuestion(t);
                        });
                });
        }
        (CF.question = function (t) {
            $(t).parent().find("button").removeClass("btn-success"), $(t).addClass("btn-success"), $("#
            
            quizz").show(), $("#u_correct_h").hide(), $("#u_exp_h").hide();
        }),
            (CF.answer = function (t) {
                $(t).parent().find("button").removeClass("btn-success"), $(t).addClass("btn-success"), $("#quizz").hide(), $("#u_correct_h").show(), $("#u_exp_h").hide();
            }),
            (CF.exp = function (t) {
                $(t).parent().find("button").removeClass("btn-success"), $(t).addClass("btn-success"), $("#quizz").hide(), $("#u_correct_h").hide(), $("#u_exp_h").show();
            });
        var RunNow = 1;
        function makeQuiz(t) {
            void 0 === list_quiz["n" + t] &&
                (CFrame._list.splice(current_q, 1),
                matrix_q.splice(current_q, 1),
                matrix_ans.splice(current_q, 1),
                --total_q,
                --current_q,
                setTimeout(function () {
                    return nextQuestion();
                }, 100)),
                (RunNow = 1;
        }
        function _getQuestionParams(t, e) {
            var n = [];
            return "q" == t ? n.push(paramsList[e].qparams) : n.push(paramsList[e].aparams), JSON.stringify(n);
        }
        function modalCreate(t, e) {
            var n;
            document.getElementById("olm_modal") ||
                (((n = document.createElement("div")).id = "olm_modal"),
                n.setAttribute("class", "modal-bg"),
                (n.innerHTML = "<div class='modal-container'><div class='modal-inner'>" + t + "</div></div>"),
                document.getElementById("qholder").appendChild(n),
                e && e.call());
        }
        function saveAll() {
            var t;
            0 != CF.user.id &&
                (((t = new Object()).id_both_skill = CF.data.id),
                (t.id_skill = CFrame.id_skill),
                (t.data_log = JSON.stringify(data_log)),
                (t.time_spent = total_time),
                (t.score = total_score),
                (t.answered = c_answered),
                (t.c_true = c_true_ans),
                (t.id_lop = CFrame.id_grade),
                (t.id_courseware = CF.data.id_courseware),
                (t.id_subject = CF.data.id_subject),
                (t.id_course = CF.data.id_course),
                (t.count = count_q),
                $.ajax({
                    url: "?g=teacherquestion.savenewbothrec",
                    type: "POST",
                    data: t,
                    success: function (t) {
                        "ok" == t ? ((data_log = []), console.log("ok")) : (alert(t), (window.location.href = "/dangnhap?return=" + CF.data.lesson_url));
                    },
                    error: function () {
                        console.log("nono");
                    },
                })),
                (count_q = 0);
        }
        function remmainSave(t) {
            $("#quiz_down").html("Còn " + t + " câu để lưu ...");
        }
        function saveAnswer(t) {
            var e = 0,
                n = 0;
            (total_score = calMark()), 1 == matrix_ans[t] ? ((c_true_ans += e = 1), createProgress()) : (n = 1);
            var i = 1 == matrix_result[indexList] ? "q-correct" : "q-wrong";
            2 == matrix_result[indexList] && (i = "q-noans"),
                $questionStatic.append("<span data-stt = '" + indexList + "' data-quiz='" + t + "' class='q-static " + i + "'></span>"),
                loadQuestionDone(),
                1 !== CF.time_expired &&
                    ((i = new Object()),
                    (total_time += timer._time),
                    (i.q_params = _getQuestionParams("q", indexList)),
                    (i.a_params = _getQuestionParams("a", indexList)),
                    (i.result = matrix_result[indexList]),
                    (i.correct = e),
                    (i.wrong = n),
                    (i.a_index = t),
                    (i.time_spent = timer._time),
                    data_log.push(i),
                    0 === (q_remain = times - ((c_answered += 1) % (times + 1))) || 100 <= total_score ? (saveAll(), $("#quiz_down").html("Đã lưu kết quả ...")) : remmainSave(q_remain),
                    CFrame.vip ||
                        ((t = olm_get_item("prcc")),
                        olm_set_item("prcc", (i = (i = new Date()).getDate() + "_" + i.getMonth()) + ":" + (t = t && i == (t = t.split(":"))[0] ? parseInt(t[1]) + 1 : 1)),
                        --CFrame._qcount,
                        (CFrame._qcount = Math.max(0, CFrame._qcount)),
                        $("#count_prc").html(CFrame._qcount),
                        CFrame._qcount <= 0 && onDailyLimited()));
        }
        function updateCoureware() {
            var t;
            0 != CF.data.id_courseware &&
                (((t = {}).id_exam = CFrame.id_skill),
                (t.id_student = CF.data.id_student),
                (t.id_group = CF.data.id_group),
                (t.id_courseware = CF.data.id_courseware),
                (t.type_cw = 6),
                (t.type_cate = "id_category"),
                (t.link_url = CF.data.link_url),
                $.ajax({
                    url: "/?g=teachercategory.updatecoureware",
                    type: "POST",
                    data: t,
                    success: function (t) {
                        console.log(t);
                    },
                    error: function () {
                        console.log("nono");
                    },
                }));
        }
        function next() {
            timer._time += 1;
            var t = parseInt(timer._time / 60),
                e = timer._time % 60,
                n = "";
            (n += t < 10 ? "0" + t : t), (n += " : "), (n += e < 10 ? "0" + e : e), $("#time").html(n);
        }
        function orgList(t) {
            for (var e = 0; e < t.length; e++) {
                var n = "n" + t[e].id;
                list_quiz[n] = t[e];
            }
            for (var i = [], e = 0; e < CF._list.length; e++)
                "1" == CF._list[e].type || (list_quiz["n" + CF._list[e].id_script] && "1" == list_quiz["n" + CF._list[e].id_script].code) ? ((CF._list[e].code = 1), i.push(e)) : (CF._list[e].code = 0), matrix_q.push(e);
            initMatrixAns(CF._record);
        }
        function initMatrixAns(t) {
            for (var e = "", n = 0; n < matrix_q.length; n++) matrix_ans[n] = 0;
            c_answered = t.length;
            for (n = 0; n < c_answered; n++) {
                var i = t[n],
                    a = JSON.parse(i.q_params),
                    r = JSON.parse(i.a_params);
                (current_q = parseInt(i.a_index)),
                    (matrix_ans[current_q] = parseInt(i.correct)),
                    void 0 === a[0] ? (paramsList[n] = { qparams: i.q_params, aparams: i.a_params }) : (paramsList[n] = { qparams: a[0], aparams: r[0] }),
                    (resultList[n] = parseInt(i.result)),
                    (timeList[n] = i.time_spent),
                    (quizList[n] = i.id_quiz);
                r = "1" == i.result ? "q-correct" : "q-wrong";
                "2" == i.result && (r = "q-noans"), (e += "<span data-stt='" + n + "' data-quiz = '" + current_q + "' class='q-static " + r + "'></span>"), (c_true_ans += parseInt(i.correct));
            }
            if (((indexList = c_answered - 1), $questionStatic.html(e), createProgress(), loadQuestionDone(), 100 <= total_score)) return OnDone();
            nextQuestion();
        }
        function calMark() {
            var t = matrix_ans.length;
            if (t <= 5) {
                for (var e = 0, n = 0; n < t; n++) e += matrix_ans[n];
                return Math.round((100 * e) / t);
            }
            for (var i = Math.floor(t / 2), a = i + Math.floor(t / 4), r = 0, o = 0, s = 0, n = 0; n < t; n++) n < i ? (r += matrix_ans[n]) : i <= n && n < a ? (o += matrix_ans[n]) : (s += matrix_ans[n]);
            return Math.round((60 * r) / i + (24 * o) / (a - i) + (16 * s) / (t - a));
        }
        (CF.timecount = function () {
            timer._time_count || ((timer._time_interval = setInterval(next, 1e3)), (timer._time_count = !0));
        }),
            (CF.timeshow = function (t) {
                (timer._time = t - 1), next(), CF.timestop();
            }),
            (CF.timestop = function () {
                (timer._time = 0), clearInterval(timer._time_interval), (timer._time_count = !1);
            }),
            (CF.saveQparams = function (t) {
                if (isReportMode && !CFrame.data.isRetry) return window.console && console.log(CFrame._list[_current_index]), !1;
                paramsList[_current_index] ? (paramsList[_current_index].qparams = t) : (paramsList[_current_index] = { qparams: t, aparams: "" });
            }),
            (CF.saveAparams = function (t) {
                paramsList[_current_index] ? (paramsList[_current_index].aparams = t) : (paramsList[_current_index] = { qparams: "", aparams: t });
            }),
            (CF._list = []),
            (CF.loadScript = function () {
                for (var i = 0; i < CF._list.length; i++) 0 == CF._list[i] && CF._list.splice(i, 1);
                2 == CF.data.id_subject && (set_lang = "en"), (p_lang = Lang_play[set_lang]), ($question = $("#question")), ($questionStatic = $("#question-static"));
                var _url = "?g=math.q_script";
                (CF.data.script_list = "0"), (CF.data.qlib_list = "0"), (total_q = CF._list.length), (total_time = parseInt(CF.total_time)), (total_score = CF.score);
                for (var i = 0; i < total_q; i++) "1" == CF._list[i].type ? (CF.data.script_list += "," + CF._list[i].id_script) : (CF.data.qlib_list += "," + CF._list[i].id_script);
                $.ajax({
                    url: _url,
                    data: { id_skill: CFrame.id_skill, script_list: CF.data.script_list, typecontent: CFrame.typecontent },
                    cache: !1,
                    method: "GET",
                    success: function (data) {
                        eval(data), CF.loadQuiz();
                    },
                    error: function () {
                        alert(CANNOT_LOAD_SCRIPT);
                    },
                }),
                    updateCoureware(),
                    (CF.soundCorrect = sound("correct")),
                    (CF.soundWrong = sound("wrong")),
                    (CF.soundComplete = sound("complete"));
                var prcc = olm_get_item("prcc"),
                    today = new Date(),
                    today = today.getDate() + "_" + today.getMonth(),
                    prcc = prcc ? ((prcc = prcc.split(":")), today == prcc[0] ? parseInt(prcc[1]) : 0) : 0;
                CFrame.vip || (CFrame._qcount -= prcc),
                    (CFrame._qcount = Math.max(0, CFrame._qcount)),
                    $("#count_prc").html(CFrame._qcount),
                    !CFrame.vip && CFrame._qcount <= 0 && onDailyLimited(),
                    setTimeout(function () {
                        $("#wrong_delete").show();
                    }, 5e3);
            }),
            (CF.loadQuiz = function () {
                $.ajax({
                    url: "?g=math.q_quiz",
                    data: { id_skill: CFrame.id_skill, id_subject: CF.data.id_subject, qlib_list: CF.data.qlib_list },
                    cache: !1,
                    method: "GET",
                    dataType: "json",
                    success: function (t) {
                        orgList(t);
                    },
                    error: function (t) {
                        console.log(t), alert(CANNOT_LOAD_SCRIPT);
                    },
                });
            });
        var current_id_quiz = 0;
        function loadQuestion(position) {
            (count_q += 1),
                (feedback_q = position),
                $("#btn-done").show(),
                $("#btn-action>button").show(),
                $("#btn-action").hide(),
                $("#ignore").show(),
                (RunNow = 1),
                indexList++,
                $("#std_btn").show(),
                $(document).off("keydown"),
                $question.html("<div id = 'quizz'></div>"),
                $("#question-static>.q-static").removeClass("q-select");
            var i = matrix_q[position],
                scriptName;
            console.log(position, matrix_q[position], CFrame._list[i]),
                (current_id_quiz = CFrame._list[i].id_script),
                1 == CFrame._list[i].type
                    ? ((scriptName = "script" + current_id_quiz),
                      (_current_index = indexList),
                      (RunNow = 1,
                      RunNow.makeQuestion(1, "quizz"),
                      CF.teacher && $("#admin-edit").attr("href", "https://olm.vn/adm/?l=math.edittmpscript&id=" + current_id_quiz),
                      $("#quizz")
                          .find("button")
                          .on("click", function (t, e) {
                              $("#quizz").find("button").removeClass("n_select"), $(this).addClass("n_select");
                          }))
                    : (makeQuiz(current_id_quiz), CF.teacher && $("#admin-edit").attr("href", "/?l=teachercourse.quiz&id_subject=" + CF.data.id_subject + "&id=" + current_id_quiz)),
                0 != $(iPad.selector).length ? iPad.defaultBehavior() : iPad.remove(),
                $("#btn-done")
                    .off("click")
                    .on("click", function () {
                        submitQuestion(position);
                    }),
                1 === CF.time_expired
                    ? $("#quizz").append(
                          "<p style = 'font-size: 16px; color: #f22727;'>Bạn đã hết hạn làm bài này, nên kết quả luyện tập sẽ không được thay đổi và lưu lại. Hãy liên hệ với giáo viên phụ trách để gia hạn thời gian làm bài!</p>"
                      )
                    : (CF.timestop(), CF.timecount()),
                disableAll();
        }
        function loadQuestionDone() {
            0 < $("#question-static>.q-static").length &&
                ($("#question-static>.q-static").on("click", function () {
                    $("#question-static>.q-static").removeClass("q-select"), handleKeyReport(this);
                }),
                $("#record-delete").show());
        }
        function createProgress() {
            0 == total_score && (total_score = CF.score);
            var t,
                e = total_score;
            0 < e &&
                ((t = "<h4>" + p_lang.completed + " <span>" + e + '%</span></h4><canvas class="loader"></canvas>'),
                $("#score-static").html(t),
                $(".loader").ClassyLoader({
                    animate: !0,
                    percentage: e,
                    speed: 1,
                    width: 160,
                    height: 160,
                    diameter: 70,
                    fontSize: "40px",
                    fontFamily: "Tahoma",
                    fontColor: "rgba(0, 194, 52, 1)",
                    lineColor: "rgb(46, 194, 0)",
                    remainingLineColor: "rgba(46, 194, 0, 0.2)",
                    lineWidth: 10,
                }),
                $("#record-delete").show()),
                100 <= e && $("#contest-result").show();
        }
        var isFullScreen = !1;
        function openFullscreen(t) {
            $(t).addClass("fullscreen"),
                (isFullScreen = !0),
                t.requestFullscreen ? t.requestFullscreen() : t.mozRequestFullScreen ? t.mozRequestFullScreen() : t.webkitRequestFullscreen ? t.webkitRequestFullscreen() : t.msRequestFullscreen && t.msRequestFullscreen();
        }
        function closeFullscreen(t) {
            $(t).removeClass("fullscreen"),
                (isFullScreen = !1),
                document.exitFullscreen
                    ? document.exitFullscreen()
                    : document.mozCancelFullScreen
                    ? document.mozCancelFullScreen()
                    : document.webkitExitFullscreen
                    ? document.webkitExitFullscreen()
                    : document.msExitFullscreen && document.msExitFullscreen();
        }
        var fullScreenEvent = !1;
        (CF.fullscreen = function () {
            var t = document.getElementById("qholder");
            (window.innerHeight == screen.height ? closeFullscreen : openFullscreen)(t),
                fullScreenEvent ||
                    document.addEventListener("fullscreenchange", function () {
                        (fullScreenEvent = !0),
                            "" != $("#fullscreen-static").html()
                                ? ($("#all-static").html($("#fullscreen-static").html()).show(), $("#fullscreen-static").html("").hide())
                                : ($("#fullscreen-static").html($("#all-static").html()).show(), $("#all-static").html("").hide()),
                            createProgress(),
                            loadQuestionDone();
                    });
        }),
            (CF.deleteRec = function () {
                if (1 === CF.time_expired && confirm(p_lang.delete_record)) {
                    for (var t = 0; t < matrix_q.length; t++) matrix_ans[t] = 0;
                    return (indexList = -1), (resultList = []), (timeList = []), (quizList = []), (current_q = total_score = 0), $("#score-static").html(""), $("#question-static").html(""), loadQuestion(current_q);
                }
                var e = CFrame.data.id;
                confirm(p_lang.delete_record) &&
                    $.ajax({
                        url: "?g=teacherquestion.deletebothrec",
                        type: "POST",
                        data: { id_both_skill: e, id_subject: CF.data.id_subject, id_skill: CFrame.id_skill },
                        success: function (t) {
                            "ok" == t ? location.reload() : alert(p_lang.error_database);
                        },
                        error: function () {
                            alert(p_lang.error_connect_server);
                        },
                    });
            });
        var repeat = 0,
            loop_q = !1;
        function nextQuestion() {
            if ((2 == current_q && CFrame.data.isG && onGuestLimited(), 0 == matrix_q.length)) return (loop_q = !1), OnDone();
            loop_q || (previous_q = current_q),
                ++current_q >= matrix_ans.length
                    ? ((loop_q = !0), (current_q = -1), nextQuestion())
                    : repeat >= matrix_ans.length || 100 <= total_score
                    ? location.reload()
                    : 1 == matrix_ans[current_q]
                    ? ((loop_q = !0), repeat++, nextQuestion())
                    : ((loop_q = !1), (repeat = 0), loadQuestion(current_q));
        }
        function sound(t) {
            t = new Audio(CF.server + "modules/math/js/sound/" + t + ".mp3");
            return (t.volume = 0.2), t;
        }
        function disableAll() {
            document.addEventListener("contextmenu", (t) => t.preventDefault()),
                (document.onkeypress = function (t) {
                    if (123 == (t = t || window.event).keyCode) return !1;
                }),
                (document.onmousedown = function (t) {
                    if (123 == (t = t || window.event).keyCode) return !1;
                }),
                (document.onkeydown = function (t) {
                    if (123 == (t = t || window.event).keyCode) return !1;
                }),
                jQuery(document).ready(function (t) {
                    t(document).keydown(function (t) {
                        var e = String.fromCharCode(t.keyCode).toLowerCase();
                        if (t.ctrlKey && ("f" == e || "c" == e || "u" == e)) return !1;
                    });
                });
        }
        (CF.next = function () {
            nextQuestion();
        }),
            (CF.play = function () {
                loadQuestion(current_q);
            }),
            (CF.ignore = function () {
                submitQuestion(current_q);
            }),
            (CF.baseSiteUrl = function () {
                return CF.server;
            }),
            (CF.getScore = function () {
                return 100;
            }),
            (CF.closeModal = function () {
                $("#olm_modal").remove();
            }),
            (CF.error = function (t) {
                $("#error_panel").html("<p class='alert alert-error'> <button type='button' class='close' data-dismiss='alert'>&times;</button>" + t + "</p>");
            }),
            (CF.openNotice = function () {
                var t;
                document.getElementById("olm_modal") ||
                    (((t = document.createElement("div")).id = "olm_modal"),
                    t.setAttribute("class", "modal-bg"),
                    (t.innerHTML =
                        "<div class='modal-container'><div class='modal-inner'><h1>Bạn còn chưa trả lời câu hỏi !</h1><p>Nếu thấy quá khó, hãy bỏ qua và làm câu tiếp theo.</p><button class='btn btn-primary' onclick='_OLM_.closeModal();'>Đóng lại và tiếp tục</button> <button onclick='_OLM_.ignore();'class='btn btn-danger'>Bỏ qua câu này</button></div></div>"),
                    document.getElementById("qholder").appendChild(t));
            }),
            (CF.images = [
                { id: "gl1", name: "bộ chìa khóa", img: "bochiakhoa.png" },
                { id: "gl2", name: "bóng đèn", img: "bongden.png" },
                { id: "gl3", name: "bông hoa", img: "bonghoa.png" },
                { id: "gl4", name: "quả bóng rổ", img: "bongro.png" },
                { id: "gl5", name: "bút lông", img: "butmau.png" },
                { id: "gl6", name: "cái chuông", img: "caichuong.png" },
                { id: "gl7", name: "con chim cánh cụt", img: "chimcanhcut.png" },
                { id: "gl8", name: "con cá", img: "conca.png" },
                { id: "gl9", name: "quả dâu", img: "dau.png" },
                { id: "gl10", name: "quả dứa", img: "dua.png" },
                { id: "gl11", name: "chiếc kính lúp", img: "kinhlup.png" },
                { id: "gl12", name: "quả lê", img: "le.png" },
                { id: "gl13", name: "bẹ chuối", img: "naichuoi.png" },
                { id: "gl14", name: "ngôi nhà", img: "ngoinha.png" },
                { id: "gl15", name: "ngôi sao", img: "ngoisao.png" },
                { id: "gl16", name: "quả bóng", img: "quabong.png" },
                { id: "gl17", name: "quả bong bay", img: "quabongbay.png" },
                { id: "gl18", name: "quả cam", img: "quacam.png" },
                { id: "gl19", name: "quả đào", img: "quadao.png" },
                { id: "gl20", name: "cuốn sách", img: "sach.png" },
                { id: "gl21", name: "quả táo", img: "tao.png" },
                { id: "gl22", name: "cục tẩy", img: "taychi.png" },
            ]),
            (CF.getImage = function (t) {
                var e = CF.images[t],
                    t = new skillImage();
                return (t.id = e.id), (t.name = e.name), (t.url = CFrame.server + "skill/images/" + e.img), (t.html = "<img src='" + t.url + "' />"), t;
            }),
            (CF.randImage = function () {
                var t = this.images.length,
                    t = this.randNext(0, t - 1);
                return this.getImage(t);
            }),
            (CF.getImageById = function (t) {
                t = parseInt(t.substr(2, t.length));
                return this.getImage(t - 1);
            }),
            (CF.id = function (t) {
                return document.getElementById(t);
            }),
            (CF.randList = function (t) {
                list1 = [];
                for (var e = 0; e < t.length; e++) list1.push(t[e]);
                var n = [];
                for (le = t.length; 0 < le; ) {
                    var i = CFrame.randNext(0, le - 1),
                        i = list1.splice(i, 1);
                    n.push(i[0]), le--;
                }
                return n;
            }),
            (CF.jsonEncode = function (t) {
                return JSON.stringify(t);
            }),
            (CF.randNext = function (t, e) {
                (e -= t), (e = Math.round(Math.random() * e));
                return parseInt(t + e);
            }),
            (CF.setExp = function (t) {
                document.getElementById("contest-view").innerHTML = t;
            }),
            (CF.addExp = function (t) {
                document.getElementById("contest-view").innerHTML += t;
            }),
            (CF.baseUrl = CF.baseSiteUrl);
        var CSS = [];
        function handleKeyReport(e) {
            var n = $("#question-static>.q-static"),
                i = 0,
                a = n.length;
            null == e && (e = n[0]);
            var r = $(e).data("stt"),
                t = $(e).data("quiz");
            reportQuestion(r, t),
                $(e).addClass("q-select"),
                $(document).keydown(function (t) {
                    $(".q-static").removeClass("q-select");
                    (t = t || window.event), (t = t.which || t.keyCode);
                    39 == t ? (i += 1) : 37 == t && --i, i < 0 && (i = a - 1), a <= i && (i = 0), (e = n[i]), (q_pos = $(e).data("stt")), (r = $(e).data("quiz")), $(e).addClass("q-select"), reportQuestion(q_pos, r);
                });
        }
        (CF.addStyleSheet = function (t) {
            (head = document.getElementsByTagName("head")[0]),
                (style = document.createElement("style")),
                (style.type = "text/css"),
                style.styleSheet ? (style.styleSheet.cssText = t) : style.appendChild(document.createTextNode(t)),
                head.appendChild(style);
        }),
            (CF.loadHistory = function () {
                handleKeyReport();
            }),
            (CF.reportError = function () {
                var t, e;
                document.getElementById("olm_modal") ||
                    (((t = document.createElement("div")).id = "olm_modal"),
                    t.setAttribute("class", "modal-bg fade in"),
                    (t.innerHTML =
                        "<div id='olm-modal-content' style='width: 620px; padding: 5px 8px; background: #ffffff;opacity: 1; box-shadow: 0px 1px 10px #000; margin: 2.5% auto;'><div style='overflow: hidden; margin: 10px;' class='olm-question-list scroll'><span class='close' onclick='CFrame.closeModal();'>&times;</span><h2 style='text-align: center;'>Báo lỗi câu hỏi</h2><p>Bạn đã gặp lỗi gì ở câu hỏi này, hãy mô tả vào ô bên dưới. Với mỗi lỗi thông báo đúng, OLM sẽ thưởng cho bạn 10 ngày VIP!</p> <textarea class='form-control' rows='5' id='reportContent' placeholder = 'Hãy mô tả vài dòng về lỗi của bài toán này.' style = 'width: 97%;'></textarea><p style='text-align: center;'><br /><button id = 'give-feedback' class='btn btn-primary' style = 'margin-right: 10px;'>Gửi báo lỗi</button><button onclick='CFrame.closeModal();' class='btn btn-danger'>Hủy</button></p><br class='clear'/></div></div>"),
                    document.getElementById("qholder").appendChild(t),
                    $(t).addClass("hidden-phone hidden-tablet"),
                    (t = matrix_q[feedback_q]),
                    (e = CFrame._list[t]),
                    $("#give-feedback").on("click", function () {
                        var t = $("#reportContent").val();
                        "" !== t
                            ? $.ajax({
                                  url: "?g=content.feedback",
                                  type: "POST",
                                  data: { id_question: e.id_script, skill: CFrame.id_skill, content: t, subject: CF.data.id_subject, id_course: CF.data.id_course, type: e.type },
                                  success: function (t) {
                                      "OK" == t
                                          ? (alert("Cảm ơn bạn đã báo lỗi, OLM sẽ xem xét phản hồi này của bạn!"), CFrame.closeModal())
                                          : "SORT" == t
                                          ? alert("Bạn vui lòng mô tả lỗi cụ thể hơn, cảm ơn bạn!")
                                          : alert("Đã xảy ra lỗi, hãy gửi lại!");
                                  },
                                  error: function () {
                                      alert("Lỗi kết nối đến máy chủ OLM, hãy thử lại!");
                                  },
                              })
                            : alert("Bạn phải mô tả về lỗi của bài toán này.");
                    }));
            }),
            (CF.guide = function (t) {
                var e;
                document.getElementById("olm_modal") ||
                    (((e = document.createElement("div")).id = "olm_modal"),
                    e.setAttribute("class", "modal-bg fade in"),
                    (e.innerHTML =
                        "<div id='olm-modal-content' style='width: 910px; padding: 5px 8px; background: #ffffff;opacity: 1; box-shadow: 0px 1px 10px #000; margin: 2.5% auto;'><div style='overflow: hidden; margin: 10px;' class='olm-question-list scroll'><div id = 'modal_conent'><span class='close' onclick='CFrame.closeModal();'>&times;</span><h2 style='text-align: center;'>Hướng dẫn cách làm bài</h2><p><iframe width='900' height='506' src='https://www.youtube.com/embed/dMcKuQY2C8o?autoplay=1' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></p></div><p style='text-align: center;'><br /><button onclick='CFrame.closeModal();' class='btn btn-primary'>Tôi đã hiểu</button>&nbsp;<button onclick='CFrame.listRestore();' class='btn btn-default'>Khôi phục điểm</button></p><br class='clear'/></div></div>"),
                    document.getElementById("qholder").appendChild(e),
                    $(e).addClass("hidden-phone hidden-tablet"));
            }),
            (CF.listRestore = function () {
                $("#modal_conent").html("<h2>Khôi phục điểm</h2><div id = 'listscore'></div>");
                $.ajax({
                    url: "?g=math.recdeleted",
                    type: "POST",
                    data: { id_skill: CF.id_skill },
                    success: function (t) {
                        var e = JSON.parse(t);
                        if (0 == e.length) alert("Không có dữ liệu khôi phục"), $("#listscore").html("Không có dữ liệu khôi phục điểm");
                        else {
                            var n = "<table class = 'table table-striped'><thead><tr><th>Ngày xóa</th><th>Đúng</th><th>Sai</th><th>Hoàn thành</th><th>Khôi phục</th></tr></thead>";
                            n += "<tbody>";
                            for (var i = 0; i < e.length; i++)
                                n +=
                                    "<tr><td>" +
                                    e[i].created_date +
                                    "</td><td>" +
                                    e[i].correct +
                                    "</td><td>" +
                                    e[i].missed +
                                    "</td><td>" +
                                    e[i].score +
                                    "</td><td><button data-id = '" +
                                    e[i]._id +
                                    "' class = 'btn btn-default' onclick = 'CFrame.restoreScore(this)'>Khôi phục</button></td></tr>";
                            (n += "</tbody></table>"), $("#listscore").html(n);
                        }
                    },
                    error: function () {
                        alert("Lỗi kết nối đến máy chủ OLM, hãy thử lại!");
                    },
                });
            }),
            (CF.restoreScore = function (t) {
                t = $(t).data("id");
                $.ajax({
                    url: "?g=math.restorescore",
                    type: "POST",
                    data: { id: t },
                    success: function (t) {
                        t = JSON.parse(t);
                        1 == t.status ? alert("Đã khôi phục điểm") : alert("Lỗi: " + t.message);
                    },
                    error: function () {
                        alert("Lỗi kết nối đến máy chủ OLM, hãy thử lại!");
                    },
                });
            }),
            (CF.rN = CF.randNext),
            (CF.rL = CF.randList),
            (CF.rI = CF.randImage),
            (window.CFrame = window.Cf = window._OLM_ = CF);
    })(window),
    (window.iPad = function () {}),
    (iPad.keys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "+", "-", "x", ":", ".", ",", ";", ">", "<", "="]),
    (iPad.html = ""),
    (iPad.selector = ".question input[type='text']"),
    (iPad.current = null),
    (iPad.hidden = !1),
    (iPad.render = function () {
        iPad.html = "<div id='olm_key_pad'>";
        for (var t = 0; t < iPad.keys.length; t++) iPad.html += "<button class='btn btn-small key-btn keypad'>" + iPad.keys[t] + "</button>";
        iPad.html += "<button onclick='return iPad.backSpace();' class='btn keypad btn-small' style='padding: 0px 5px;'><b class='backspace'></b></button></div>";
    }),
    (iPad.keyPad = function (t) {
        $("#olm_keypad").remove(),
            iPad.render(),
            (t.innerHTML = iPad.html),
            $(".key-btn").each(function (t, e) {
                e.onclick = function () {
                    (iPad.current.value += $(e).text()), iPad.sizeX();
                };
            });
    }),
    (iPad.sizeX = function () {
        var t = 15 * iPad.current.value.length;
        20 < t ? $(iPad.current).css("width", t) : $(iPad.current).css("width", 20);
    }),
    (iPad.dropTo = function (t) {
        (iPad.selector = t),
            $(t)
                .focus(function () {
                    iPad.current = this;
                })
                .get(0)
                .focus(),
            (iPad.current = $(t).get(0));
    }),
    (iPad.show = function () {
        0 != $(iPad.selector).length && (iPad.keyPad(document.getElementById("ipad_container")), iPad.dropTo(iPad.selector));
    }),
    (iPad.backSpace = function () {
        var t = (t = iPad.current.value).substring(0, t.length - 1);
        (iPad.current.value = t), iPad.sizeX();
    }),
    (iPad.toggle = function () {
        iPad.hidden ? (iPad.show(), (iPad.hidden = !1)) : (iPad.remove(), (iPad.hidden = !0));
    }),
    (iPad.remove = function () {
        $("#olm_key_pad").remove();
    }),
    (iPad.defaultBehavior = function (t) {
        iPad.hidden || iPad.show();
    });
