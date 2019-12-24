package com.project.khajit_app.activity.ui.article

import android.content.Context
import android.graphics.Color
import android.net.Uri
import android.os.Bundle
import android.os.Handler
import android.os.HandlerThread
import android.text.Spannable
import android.text.SpannableString
import android.text.TextPaint
import android.text.method.LinkMovementMethod
import android.text.style.BackgroundColorSpan
import android.text.style.ClickableSpan
import android.view.*
import android.widget.ImageView
import android.widget.TextView
import androidx.fragment.app.Fragment
import android.widget.Toast
import androidx.core.text.trimmedLength
import androidx.fragment.app.FragmentManager
import com.bumptech.glide.Glide

import com.project.khajit_app.R
import com.project.khajit_app.activity.ui.annotation.DisplayAnnotationFromSourceFragment
import com.project.khajit_app.api.RetrofitClient
import com.project.khajit_app.data.annotationModels.GetAnnotationModelResponse
import com.project.khajit_app.data.annotationModels.ShowTextAnnotationModel
import com.project.khajit_app.data.annotationModels.sourceModel
import com.project.khajit_app.data.models.GeneralArticleModel
import com.project.khajit_app.data.models.GeneralArticleSpannableModel
import com.project.khajit_app.databinding.DisplayArticleFragmentBinding
import interfaces.fragmentOperationsInterface
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.net.URLEncoder

class displayArticleFragment : Fragment(), fragmentOperationsInterface {

    private var isGuest : Int = 0
    private var isLoggedInUser : Int = 0
    private var isFeedPage: Int = 0
    private var isFollowing : Int = 0
    private var userId : Int = 0
    private var article_id : Int = 0
    private lateinit var articleModel : GeneralArticleModel
    private lateinit var articleSpannableModel : GeneralArticleSpannableModel
    private var containerId : ViewGroup? = null
    private var annotationTexts = ArrayList<ShowTextAnnotationModel>()
    private  var annotationSource = ""
    private lateinit var spannable : SpannableString
    private lateinit var imageView : ImageView
    private lateinit var contentView : TextView
    private lateinit var displayArticleFragmentBinding : DisplayArticleFragmentBinding


    companion object {

        private const val ARTICLEMODEL = "model"
        private const val ISGUEST = "isGuest"
        private const val ISLOGGEDINUSER = "isLoggedInUser"
        private const val ISFEEDPAGE = "isFeedPage"
        private  const val ISFOLLOWING = "isFollowing"
        private  const val USERID = "userId"

        fun newInstance(generalArticleModel: GeneralArticleModel,isGuest : Int,isLoggedInUser : Int,isFeedPage: Int, isFollowing : Int, userId: Int): displayArticleFragment {
            val args = Bundle()
            args.putSerializable(ARTICLEMODEL, generalArticleModel)
            args.putInt(ISGUEST,isGuest)
            args.putInt(ISLOGGEDINUSER,isLoggedInUser)
            args.putInt(ISFEEDPAGE,isFeedPage)
            args.putInt(ISFOLLOWING,isFollowing)
            args.putInt(USERID,userId)
            val fragment = displayArticleFragment()
            fragment.arguments = args
            return fragment
        }
    }

    private lateinit var viewModel: DisplayArticleViewModel

    override fun onAttach(context: Context) {
        super.onAttach(context)

    }
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        //return inflater.inflate(R.layout.display_article_fragment, container, false)
        annotationTexts.clear()
        displayArticleFragmentBinding =
            DisplayArticleFragmentBinding.inflate(inflater, container, false)

        //model.text = String.format(getString(R.string.description_format), model.description, model.url)
        displayArticleFragmentBinding.articlSpanableModel = null
        imageView = displayArticleFragmentBinding.articleImageDisplayDetails
        containerId = container
        contentView = displayArticleFragmentBinding.articleContentDetails

        articleModel = arguments!!.getSerializable(ARTICLEMODEL) as GeneralArticleModel
        isGuest = arguments!!.getInt(ISGUEST)
        isLoggedInUser = arguments!!.getInt(ISLOGGEDINUSER)
        isFeedPage = arguments!!.getInt(ISFEEDPAGE)
        isFollowing = arguments!!.getInt(ISFOLLOWING)
        userId = arguments!!.getInt(USERID)
        val parentActivityManager : FragmentManager = activity?.supportFragmentManager as FragmentManager

        article_id = articleModel.id!!
        //getAnnotations(articleModel)
        spannable = SpannableString(articleModel.content)
        val handlerThread = HandlerThread("NETWORK_FALAN MAHMUT")
        handlerThread.start()
        val handler = Handler(handlerThread.looper)

        handler.postDelayed({
            annotationSource = "http://www.khajiittraders.tk/article/" + article_id+ "/"
            RetrofitClient.instanceAnnotation.getAnnotationsBySource(annotationSource).enqueue(object :
                Callback<GetAnnotationModelResponse> {
                override fun onResponse(
                    call: Call<GetAnnotationModelResponse>,
                    response: Response<GetAnnotationModelResponse>
                ) {

                    println("\n #########################")
                    println(response.body())
                    //val oneAnnotation = ShowTextAnnotationModel("sagasg",null,null, "ljsfgh",8,16)
                    if(response.code() == 200 && response.body()!!.result != null){
                        for(resultAnnotationModel in response.body()!!.result) {
                            if( resultAnnotationModel.target!!.type == "text" || resultAnnotationModel.target!!.type == "Text"){
                                val startChar = resultAnnotationModel.target!!.selector.refinedBy.start
                                val endChar = resultAnnotationModel.target!!.selector.refinedBy.end
                                val annotationText = articleModel.content!!.substring(startChar,endChar)
                                println("-------------> " + annotationText)
                                val oneAnnotation = ShowTextAnnotationModel(resultAnnotationModel.id!!,resultAnnotationModel.creator!!,resultAnnotationModel.body!!,annotationText,startChar,endChar,"","")
                                annotationTexts.add(oneAnnotation)



                            }

                        }
                        for(annotation in annotationTexts){
                            spannable.setSpan( BackgroundColorSpan(Color.parseColor("#FFFFC107")), annotation.startChar, annotation.endChar,Spannable.SPAN_INCLUSIVE_INCLUSIVE)
                            spannable.setSpan(ClickHandler(activity as Context,annotation.startChar,annotation.endChar,parentActivityManager),annotation.startChar, annotation.endChar,Spannable.SPAN_INCLUSIVE_INCLUSIVE)
                            articleSpannableModel = GeneralArticleSpannableModel(articleModel.id,articleModel.title,spannable,articleModel.author,articleModel.is_public,articleModel.created_date,articleModel.image)
                            displayArticleFragmentBinding.articlSpanableModel = articleSpannableModel
                            articleSpannableModel.author!!.first_name = articleSpannableModel.author!!.first_name + " "
                            contentView.movementMethod = LinkMovementMethod.getInstance()
                        }
                        //Toast.makeText(context,"Response döndü 1 " + annotationTexts.size,Toast.LENGTH_LONG).show()


                        //spannable.setSpan( BackgroundColorSpan(Color.YELLOW), 8, 16,Spannable.SPAN_INCLUSIVE_INCLUSIVE)
                        //spannable.setSpan(ClickHandler(activity as Context,8 ),8,16,Spannable.SPAN_INCLUSIVE_INCLUSIVE)
                        articleSpannableModel = GeneralArticleSpannableModel(articleModel.id,articleModel.title,spannable,articleModel.author,articleModel.is_public,articleModel.created_date,articleModel.image)
                        displayArticleFragmentBinding.articlSpanableModel = articleSpannableModel
                        articleSpannableModel.author!!.first_name = articleSpannableModel.author!!.first_name + " "
                        contentView.movementMethod = LinkMovementMethod.getInstance()



                    }else{
                        println(response.message())
                    }


                }
                override fun onFailure(call: Call<GetAnnotationModelResponse>, t: Throwable) {
                    println(t.message)
                    println(t)
                    Toast.makeText(context,t.message,Toast.LENGTH_LONG).show()
                }
            })




        }, 3000)
        if(articleModel.image != null)
            Glide.with(activity).load(articleModel.image).into(imageView)
        else{
            val imgResId = R.drawable.ic_article_image_no_content_foreground
            imageView.setImageResource(imgResId)

        }
        return displayArticleFragmentBinding.root
    }


        internal inner class ClickHandler(

            private val context : Context,
            private val start_position: Int,
            private val end_position: Int,
            private val manager: FragmentManager
        ) : ClickableSpan() {
            override fun onClick(widget: View) {
                //Toast.makeText(context,"annotated position " + position, Toast.LENGTH_LONG).show()


                    fragmentTransaction(
                    manager,
                    DisplayAnnotationFromSourceFragment.newInstance(annotationTexts,start_position,end_position),
                    (containerId!!.id),
                    false,
                    true,
                    false)

            }

            override fun updateDrawState(ds: TextPaint) {
                ds?.isUnderlineText = false
                ds?.color = Color.BLACK
            }
        }








}



