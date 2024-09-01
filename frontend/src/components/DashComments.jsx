/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Modal, Table, Button } from "flowbite-react";
import axios from "axios";
import { server } from "../redux/store";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DashComments = () => {
  const [comments, setComments] = useState([]);

  const { currentUser } = useSelector((state) => state.user);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${server}/comment/get/all/comments`, {
        withCredentials: true,
      });
      if (data.success) {
        setComments(data.comments);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    };
    if (currentUser.user.isAdmin) {
      fetchData();
    }
  }, [currentUser.user._id, comments]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const { data } = await axios.get(
        `${server}/comment/get/all/comments?startIndex=${startIndex}`,
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        setComments([...comments, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const { data } = await axios.delete(
        `${server}/comment/delete/comment/${commentIdToDelete}`,
        {
          withCredentials: true,
        }
      );

      if (data.success === false) {
        console.log(data.message);
      } else {
        const { data } = await axios.get(`${server}/comment/get/all/comments`, {
          withCredentials: true,
        });
        setComments(data.comments);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.user.isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Comment Content</Table.HeadCell>
              <Table.HeadCell>Number of likes</Table.HeadCell>
              <Table.HeadCell>PostId</Table.HeadCell>
              <Table.HeadCell>UserId</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {comments.map((comment) => (
              <Table.Body key={comment._id} className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={comment.content}
                      alt="User Image"
                      className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                    />
                  </Table.Cell>
                  <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  <Table.Cell>{comment.postId}</Table.Cell>
                  <Table.Cell>{comment.userId}</Table.Cell>
                  <Table.Cell>
                    <span
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(comment._id);
                      }}
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no comments yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteComment}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashComments;
